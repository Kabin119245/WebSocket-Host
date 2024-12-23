// textractService.js

const AWS = require("./awsConfig"); // Import AWS configuration
const textract = new AWS.Textract(); // Initialize Textract client

// Function to call Textract's DetectDocumentText API
async function analyzeIdentityDocument(fileBuffer) {
  const params = {
    DocumentPages: [
      // DocumentPages must be an array of Document objects
      {
        Bytes: fileBuffer, // The document as a buffer (image or PDF)
      },
    ],
  };

  try {
    const response = await textract.analyzeID(params).promise();
    return response;
  } catch (error) {
    console.error("Error processing identity document with Textract:", error);
    throw error;
  }
}

module.exports = { analyzeIdentityDocument };
