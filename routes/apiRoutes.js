// Dependencies 
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const generateUniqueId = require('generate-unique-id');

// Imports db.json data 
const database = require('../db/db.json');

// Routing 
let currentId;
module.exports = (app) => {
    // API GET request
    app.get('/api/notes', (req, res) => res.json(database));

    // API POST request
    app.post('/api/notes', (req, res) => {
        // Add note to database array
        database.unshift(req.body);

        // Write new db.json file
        fs.writeFile(path.join(__dirname, '../db/db.json'), writeJSON(database), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(chalk.black.bgGreenBright(` Note #${currentId} successfully saved! `));
            }
        });

        res.json();
    });

    app.delete('/api/notes/:id', (req, res) => {
        const id = req.params.id;
        for (var i = 0; i < database.length; i++) {
            if (database[i].id === id) {
                // Sets currentId variable (for success message)
                currentId = database[i].id;
                database.splice(i, 1);
            }
        }

        fs.writeFile(path.join(__dirname, '../db/db.json'), writeJSONDelete(database), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(chalk.black.bgMagenta(` Note #${currentId} successfully deleted. `));
            }
        });

        res.json();
    });
}

// Formats db.json file for POST requests
function writeJSON(database) {
    let jsonFile = `[`;
    // Generates unique id for new note
    let id = generateUniqueId({
        length: 10
    });

    for (var i = 0; i < database.length; i++) {
        // Correctly formats JSON line breaks
        database[i].text = database[i].text.replace(/(\r\n|\n|\r)/gm, "\\n");

        // Sets id property of new note object in database array
        if (i === 0) {
            database[i].id = id;
            currentId = database[i].id;
        }

        if (i < database.length - 1) {
            jsonFile += `
    {
        "title": "${database[i].title}",
        "text": "${database[i].text}",
        "id": "${database[i].id}"
    },`
        } else {
            jsonFile += `
    {
        "title": "${database[i].title}",
        "text": "${database[i].text}",
        "id": "${database[i].id}"
    }
]`
        }
    }
    return jsonFile;
}

// Formats db.json file for DELETE requests
function writeJSONDelete(database) {
    let jsonFile = `[`;

    for (var i = 0; i < database.length; i++) {
        if (i < database.length - 1) {
            jsonFile += `
    {
        "title": "${database[i].title}",
        "text": "${database[i].text}",
        "id": "${database[i].id}"
    },`
        } else {
            jsonFile += `
    {
        "title": "${database[i].title}",
        "text": "${database[i].text}",
        "id": "${database[i].id}"
    }
`
        }
    }
    jsonFile += ']';
    return jsonFile;
}