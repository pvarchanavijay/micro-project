const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'web', 
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database');
});

// Create a new item
app.post('/create', (req, res) => {
    const { name, age } = req.body;
    const query = 'INSERT INTO users (name, age) VALUES (?, ?)';
    connection.query(query, [name, age], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Error inserting data');
        }
        res.status(200).send('Data inserted successfully');
    });
});

// Get all items
app.get('/read', (req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        res.status(200).json(results);
    });
});

// Update an item
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    const query = 'UPDATE users SET name = ?, age = ? WHERE id = ?';
    connection.query(query, [name, age, id], (err, results) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).send('Error updating data');
        }
        res.status(200).send('Data updated successfully');
    });
});

// Delete an item
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.status(500).send('Error deleting data');
        }
        res.status(200).send('Data deleted successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
