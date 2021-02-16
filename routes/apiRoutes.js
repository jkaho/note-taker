// Dependencies 
const fs = require('fs');

// Import db.json data 
const database = require('../db/db.json');

// Routing 
module.exports = (app) => {
    // API GET request
    app.get('/api/notes', (req, res) => res.json(database));

    // API POST request
    app.post('/api/notes', (req, res) => {
        // Add note to database array
        database.push(req.body);

        // Write new db.json file
        fs.writeFile('../db/db.json', json, 'utf8', database);

        res.json();
    })
}
