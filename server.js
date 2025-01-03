const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const fs = require("fs");
const path = require("path");
const winston = require("winston");

require("dotenv").config();

// Create logs directory if it doesn't exist (optional)
const logDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Initialize Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
    )
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, "interaction_logs.txt"),
    }),
    new winston.transports.Console(),
  ],
});

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware for CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Define a route to log interactions
app.post("/api/log", (req, res) => {
  const logData = req.body;
  const logEntry = `${new Date().toISOString()} - ${JSON.stringify(logData)}\n`;

  // Append the log entry to the log file
  fs.appendFile(path.join(logDir, "interaction_logs.txt"), logEntry, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
      return res.status(500).send("Failed to log interaction");
    }
    logger.info(`Logged interaction: ${JSON.stringify(logData)}`);
    res.status(200).send("Interaction logged successfully");
  });
});

// Route to fetch log data
app.get("/api/logs", (req, res) => {
  const logFilePath = path.join(logDir, "interaction_logs.txt");

  // Read the log file asynchronously
  fs.readFile(logFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading log file:", err);
      return res.status(500).send("Failed to retrieve logs");
    }

    // Parse the log data (if it's a JSON array of log entries)
    const logEntries = data
      .split("\n")
      .filter((line) => line)
      .map((line) => {
        try {
          const log = JSON.parse(line.split(" - ")[1]); // Extract JSON from the log line
          return log;
        } catch (error) {
          return null;
        }
      })
      .filter((log) => log);

    res.status(200).json(logEntries);
  });
});

// Use Winston to log every API request
app.use((req, res, next) => {
  logger.info(`Request to ${req.method} ${req.url}`);
  next();
});

app.get("/check", (req, res) => {
  res.send("Hello, World!");
});

// Setup WebSocket server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (or specify allowed origins)
  },
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  logger.info(`A client connected: ${socket.id}`);

  socket.on("message", (data) => {
    logger.info(`Message received from client: ${data}`);
    socket.broadcast.emit("message", data);
  });

  socket.on("disconnect", () => {
    logger.info(`A client disconnected: ${socket.id}`);
  });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
});
