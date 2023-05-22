const router = require("express").Router();
const { checkAuth } = require("../middleware");
// const Articles = require("./model.js");
const mongoose = require('mongoose')
const {marked} = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)
const multer = require("multer");
const bodyParser = require("body-parser");

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    return cb(null, file.originalname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

router.post('/upload-image', async (req, res) => {
  const command = new PutObjectCommand({
    Bucket: "test-bucket",
    Key: "hello-s3.txt",
    Body: "Hello S3!",
  });
  console.log('in')
  console.log(req.file)
  res.send('yes');
})


router.get("/", async (req, res) => {
  let { page, limit, sortBy, sortDirection, search, ...restQuery } = req.query;
        
        limit = limit ? Number(limit) : 10;
        sortDirection = sortDirection ? sortDirection : 'desc';
        sortBy = sortBy ? sortBy : { createdAt: -1 };
        const skip = limit * Number(page) - limit || 0;
        const next = limit * Number(page);
        let hasNext = false;
        switch (sortBy) {
            case 'title':
                if (sortDirection === 'asc') {
                    sortBy = { title: 1 };
                } else {
                    sortBy = { title: -1 };
                }
                break;

            case 'createdAt':
                if (sortDirection === 'asc') {
                    sortBy = { createdAt: 1 };
                } else {
                    sortBy = { createdAt: -1 };
                }
                break;
            default:
                sortBy = { createdAt: -1 };
                break;
        }

        if (search) {
            const searchRegex = new RegExp(`${search}`, 'i');
            restQuery = { ...restQuery, $or: [ { 'title': searchRegex }, { 'description': searchRegex } ] };
        }
      

        const articles = await mongoose.connection.db.collection('articles')
            .find({ ...restQuery })
            .sort(sortBy)
            .skip(skip)
            .limit(limit).toArray()
        const total = await mongoose.connection.db.collection('articles').countDocuments({ ...restQuery });

        if (next < total) {
            hasNext = true;
        }

        res.json({data: articles, total, hasNext});
});
router.get("/:id", async (req, res) => {
  const article = await mongoose.connection.db.collection('articles').findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
  if (article == null) return res.send("No article found");
  res.send(article);
});

router.post("/", async (req, res) => {
  let sanitizedHtml = ''
  if (req.body.markdown) {
    sanitizedHtml = dompurify.sanitize(marked.parse(req.body.markdown))
    req.body.sanitizedHtml = sanitizedHtml
  }
  const insertArticle = await mongoose.connection.db.collection('articles').insertOne({ ...req.body });
  res.send(insertArticle);
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  let sanitizedHtml = ''
  if (req.body.markdown) {
    sanitizedHtml = dompurify.sanitize(marked.parse(req.body.markdown))
    req.body.sanitizedHtml = sanitizedHtml
  }
  const insertArticle = await mongoose.connection.db.collection('articles').findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(id),
    },
    {
      $set: {
        ...req.body,
      },
    }
  );
  res.send(insertArticle);
});

router.delete("/:id", async(req, res) => {
    await mongoose.connection.db.collection('articles').findOneAndDelete({_id: new mongoose.Types.ObjectId(req.params.id)})
    return res.sendStatus(200)
})

module.exports = router;
