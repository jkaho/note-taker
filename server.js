// Dependencies 
const express = require('express');

// Express configuration
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());