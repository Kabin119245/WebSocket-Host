// middleware/uploadMiddleware.js

const multer = require("multer");

// Multer configuration: Store files in memory (not to disk)
const storage = multer.memoryStorage();

// Multer instance for handling file uploads
const upload = multer({ storage: storage });

module.exports = { upload };
