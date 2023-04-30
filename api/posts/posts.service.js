require("dotenv").config();
const mongoose = require("mongoose");


class PostService {
  constructor() {}

  async getAll(currentUserDetails) {
    try {
      const { phone } = currentUserDetails
      return {
        message: phone
      };
    } catch (errors) {
      throw errors;
    }
  }
  
}

module.exports = { PostService };
