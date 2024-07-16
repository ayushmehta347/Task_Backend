const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const { authenticated } = require('./middleware/auth');
dotenv.config({
    path: "./data/config.env"
});

const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGO_URI; 

app.use(cookieParser());
app.use(bodyParser.json());

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB->>>>>>>>>>>>>>>>>>>>>');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use('/api/todos', todoRoutes);

module.exports = app;const http = require("http");

// Creating server
const server = http.createServer((req, res) => {
  // Sending the response
  res.write("This is the response from the server");
  res.end();
});

// Server listening to port 3000
server.listen(3000, () => {
  console.log("Server is Running");
});