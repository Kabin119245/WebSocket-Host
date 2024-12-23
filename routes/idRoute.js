// routes/idRoutes.js

const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/uploadMiddleware"); // Multer file upload middleware
const { processDocument } = require("../controller/idController"); // Controller to process document

// Define POST route for uploading and processing the document
router.post("/upload-id", upload.single("idImage"), processDocument);

module.exports = router;
