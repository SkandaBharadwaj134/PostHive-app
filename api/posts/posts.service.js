require("dotenv").config();
const mongoose = require("mongoose");

class PostService {
  constructor() {}

  async getAll(query, currentUserDetails) {
    try {
      let { page, limit, sortBy, sortDirection, search, ...restQuery } = query;
      const { phone } = currentUserDetails;
      restQuery.phone = phone;
      limit = limit ? Number(limit) : 10;
      sortDirection = sortDirection ? sortDirection : "desc";
      sortBy = sortBy ? sortBy : { createdAt: -1 };
      const skip = limit * Number(page) - limit || 0;
      const next = limit * Number(page);
      let hasNext = false;
      switch (sortBy) {
        case "title":
          if (sortDirection === "asc") {
            sortBy = { postTitle: 1 };
          } else {
            sortBy = { postTitle: -1 };
          }
          break;

        case "createdAt":
          if (sortDirection === "asc") {
            sortBy = { createdAt: 1 };
          } else {
            sortBy = { createdAt: -1 };
          }
          break;
        case "likes":
          if (sortDirection === "asc") {
            sortBy = { likes: 1 };
          } else {
            sortBy = { likes: -1 };
          }
          break;
        default:
          sortBy = { createdAt: -1 };
          break;
      }

      if (search) {
        const searchRegex = new RegExp(`${search}`, "i");
        restQuery = {
          ...restQuery,
          $or: [{ authorName: searchRegex }, { postTitle: searchRegex }],
        };
      }

      const posts = await mongoose.connection.db
        .collection("posts")
        .find({ ...restQuery })
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .toArray();
      const total = await mongoose.connection.db
        .collection("posts")
        .countDocuments({ ...restQuery });

      if (next < total) {
        hasNext = true;
      }

      return { data: posts, total, hasNext };
    } catch (errors) {
      throw errors;
    }
  }
  async getSingle(id, currentUserDetails) {
    const { phone } = currentUserDetails;
    const post = await mongoose.connection.db
      .collection("posts")
      .findOne({ _id: new mongoose.Types.ObjectId(id) });
    if (!post) {
      return {
        message: "Post doesn't exist",
      };
    }
    return {
      data: post,
    };
  }

  async insert({ ...data }, currentUserDetails) {
    data.phone = currentUserDetails.phone;
    data.authorName = currentUserDetails.name;
    data.authorId = currentUserDetails.userId.toString();
    data.postId = (Math.floor(Math.random() * 9000) + 1000).toString(),
    data.createdAt = new Date();
    const insert = await mongoose.connection.db
      .collection("posts")
      .insertOne({ ...data });
    return {
      data: insert,
    };
  }

  async update(id, { ...data }, currentUserDetails) {
    data.phone = currentUserDetails.phone;
    const update = await mongoose.connection.db
      .collection("posts")
      .findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(id),
          phone: data.phone,
        },
        {
          $set: {
            ...data,
          },
        },
        { new: true }
      );
    if (!update.value) {
      return {
        message: "Post not found",
      };
    }
    return {
      data: update.value,
    };
  }

  async delete(id, currentUserDetails) {
    const { phone } = currentUserDetails;
    const deletePost = await mongoose.connection.db
      .collection("posts")
      .deleteOne({
        _id: new mongoose.Types.ObjectId(id),
        phone,
      });
    if (deletePost.deletedCount > 0) {
      return { deleted: true };
    }
    return {
      message: "Post not found",
    };
  }
}

module.exports = { PostService };
