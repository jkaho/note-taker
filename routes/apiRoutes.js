// Dependencies 
const fs = require('fs');
const path = require('path');
const generateUniqueId = require('generate-unique-id');

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
        fs.writeFile(path.join(__dirname, '../db/db.json'), writeJSON(database), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('File written successfully!');
            }
        });

        res.json();
    })
}

// Formats db.json file
function writeJSON(database) {
    let jsonFile = `[`;

    for (var i = 0; i < database.length; i++) {
        let id = generateUniqueId({
            length: 10
        });

        if (i < database.length - 1) {
            jsonFile += `
    {
        "title": "${database[i].title}",
        "text": "${database[i].text}",
        "id": "${id}"
    },`
        } else {
            jsonFile += `
    {
        "title": "${database[i].title}",
        "text": "${database[i].text}",
        "id": "${id}"
    }
]`
        }
    }
    return jsonFile;
}