const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser'); 

const app = express();
const PORT = process.env.PORT || 4001;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'html'));

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// MySQL database connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todoList',
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('MySQL connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle requests for the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/html/index.html'));
});
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/html/index.html'));
});
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/html/contact.html'));
});

app.get('/projets', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/html/projets.html'));
});
app.get('/experience', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/html/experience.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});
