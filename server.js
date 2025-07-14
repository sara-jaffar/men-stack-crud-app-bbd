const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const mongoose = require("mongoose");
const app = express();
const path = require('path');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// MIDDLEWARE
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
    console.log('Listening on port 3000');
})

app.get('/', (req, res) => {
    res.render('index.ejs');
})