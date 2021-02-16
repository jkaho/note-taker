// Dependencies 
const express = require('express');

// Express configuration
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Router
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// Listener 
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});