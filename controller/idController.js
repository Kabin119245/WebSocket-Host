// controllers/idController.js

const { analyzeIdentityDocument } = require("../textractService");

// Controller function to handle uploaded document
async function processDocument(req, res) {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  try {
    const result = await analyzeIdentityDocument(req.file.buffer); // Pass the file buffer to Textract
    res.json(result); // Return the Textract response as JSON
  } catch (error) {
    res.status(500).send("Error processing the document");
  }
}

module.exports = { processDocument };
