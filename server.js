// server.js

const express = require("express");
const app = express();
const idRoutes = require("./routes/idRoute"); // Import routes
const cors = require("cors");
const http = require("http");

const { Server } = require("socket.io");


// Middleware for CORS (Cross-Origin Resource Sharing) if necessary for frontend-backend communication
app.use(cors());

// Use the ID routes
app.use("/api", idRoutes); // All routes prefixed with /api

app.get("/check", (req, res) => {
  res.send("Hello, World!");
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins (or specify allowed origins)
     
    }
});


// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  // Listen for a custom event from the client
  socket.on("message", (data) => {
      console.log("Message received from client:", data);
//broadcast
socket.broadcast.emit("message", data);
  });

  // Handle client disconnection
  socket.on("disconnect", () => {
      console.log("A client disconnected:", socket.id);
  });
});




// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
