const express = require("express");
const { getBooks, addBook } = require("../controllers/bookController");
const authMiddleware = require("../middleware/auth");

const bookRouter = express.Router();

bookRouter.get("/", authMiddleware, getBooks);

bookRouter.post("/create", authMiddleware, addBook);

module.exports = bookRouter;
