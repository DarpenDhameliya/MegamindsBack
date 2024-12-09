const Book = require("../models/Book");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch books", error: error.message });
  }
};

exports.addBook = async (req, res) => {
  try {
    const { title, author } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: "Fields are required" });
    }

    const newBook = new Book({ title, author });
    const savedBook = await newBook.save();

    res.status(200).json(savedBook);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add book", error: error.message });
  }
};
