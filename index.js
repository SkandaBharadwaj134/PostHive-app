require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const api = require("./api");

// Connection Mongoose
const mongoose = require("mongoose");
const { MONGODB_URI } = process.env;
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
const cors = require("cors");
// Allow all origins
const options = {
  origin: "*",
};
app.use(cors(options));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
