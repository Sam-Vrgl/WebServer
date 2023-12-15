const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser'); 

const app = express();
const PORT = 3000;

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
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/html/index.html'));
});
app.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/html/contact.html'));
});


// Handle requests for the todo.ejs file
app.get('/todo.html', (req, res) => {
    // Sample MySQL query to select specified columns from tasks
    const query = 'SELECT id_task, task_name, task_state, task_content FROM tasks';

    // Execute the query
    db.query(query, (err, results) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('MySQL query results:', results);
            // Render todo.ejs file with data
            res.render('todo', {
                tasks: results,
            });
        }
    });
});

// Handle GET requests to fetch updated tasks
app.get('/getTasks', (req, res) => {
    // Sample MySQL query to get tasks (adjust as needed)
    const getTasksQuery = 'SELECT * FROM tasks';

    // Execute the query
    db.query(getTasksQuery, (err, tasks) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Render the updated tasks as HTML directly in the response
            console.error('updated tasks');
            res.render('todo', { tasks });
        }
    });
});

// Handle POST requests to add tasks
app.post('/addTask', (req, res) => {
    const { taskName, taskContent } = req.body;

    // Sample MySQL query to insert a new task
    const insertQuery = 'INSERT INTO tasks (task_name, task_state, task_content, task_id_user) VALUES (?, ?, ?, ?)';
    const values = [taskName, false, taskContent, 1]; // Assuming task_id_user is 1, update accordingly

    // Execute the query
    db.query(insertQuery, values, (err, result) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('New task added:', result);
            res.redirect('/todo.html'); // Redirect to the todo page after adding the task
        }
    });
});

// Handle POST requests to edit tasks
app.post('/editTask', (req, res) => {
    const { taskId, editTaskName, editTaskContent } = req.body;

    // Sample MySQL query to update an existing task
    const updateQuery = 'UPDATE tasks SET task_name = ?, task_content = ? WHERE id_task = ?';
    const updateValues = [editTaskName, editTaskContent, taskId];

    // Execute the query
    db.query(updateQuery, updateValues, (err, result) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Task updated:', result);
            res.redirect('/todo.html'); // Redirect to the todo page after updating the task
        }
    });
});

// Handle POST requests to update task state
app.post('/updateTaskState', (req, res) => {
    const { taskId, newState } = req.body;

    // Sample MySQL query to update the task state
    const updateStateQuery = 'UPDATE tasks SET task_state = ? WHERE id_task = ?';
    const updateStateValues = [newState, taskId];

    // Execute the query
    db.query(updateStateQuery, updateStateValues, (err, result) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Task state updated:', result);
            res.send('Task state updated successfully');
        }
    });
});

// Handle POST requests to delete tasks
app.post('/deleteTask', (req, res) => {
    const { taskId } = req.body;

    // Sample MySQL query to delete the task
    const deleteQuery = 'DELETE FROM tasks WHERE id_task = ?';
    const deleteValues = [taskId];

    // Execute the query
    db.query(deleteQuery, deleteValues, (err, result) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Task deleted:', result);
            res.send('Task deleted successfully');
            res.redirect('/todo.html');
        }
    });
});



app.get('/projets.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/html/projets.html'));
});
app.get('/experience.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/html/experience.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});
