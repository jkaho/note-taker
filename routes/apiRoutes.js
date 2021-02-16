// Dependencies 
const fs = require('fs');
const path = require('path');

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
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(database), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('File written successfully!');
            }
        });

        res.json();
    })
}
