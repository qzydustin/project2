const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();


function rowToObject(row) {
    return {
        id: row.id,
        item: row.item,
        amount: row.amount,
        note: row.note,
        urgent: row.urgent,
    };
}


app.get('/allorders', (request, response) => {
    const query = 'SELECT item, amount, note, urgent, id  FROM orders WHERE is_deleted = 0';
    connection.query(query, null, (errors, rows) => {
        response.send({
            ok: true,
            orders: rows.map(rowToObject),
        });
    });
});

app.get('/item/:item', (request, response) => {
    const query = 'SELECT item, amount, note, urgent, id FROM orders WHERE is_deleted = 0 AND item = ?';
    const params = [request.params.item];
    connection.query(query, params, (errors, rows) => {
        response.send({
            ok: true,
            orders: rows.map(rowToObject),
        });
    });
});

app.get('/urgent', (request, response) => {
    const query = 'SELECT item, amount, note, urgent, id FROM orders WHERE is_deleted = 0 AND urgent = 1';
    connection.query(query, (errors, rows) => {
        response.send({
            ok: true,
            orders: rows.map(rowToObject),
        });
    });
});



app.post('/order', (request, response) => {
    const query = 'INSERT INTO orders (item, amount, note, urgent) VALUES (?, ?, ?, ?)';
    const params = [request.body.item, request.body.amount, request.body.note, request.body.urgent];
    connection.query(query, params, (errors, result) => {
        response.send({
            ok: true,
            id: result.insertId,
        });
    });
});

app.patch('/order/:id', (request, response) => {
    const query = 'UPDATE orders SET item = ?, amount = ?, note = ?, urgent = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    const params = [request.body.item, request.body.amount, request.body.note, request.body.urgent, request.params.id];
    connection.query(query, params, (errors, result) => {
        response.send({
            ok: true,
        });
    });
});

app.delete('/order/:id', (request, response) => {
    const query = 'UPDATE orders SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    const params = [request.params.id];
    connection.query(query, params, (errors, result) => {
        response.send({
            ok: true,
        });
    });
});

const port = 41000;
app.listen(port, () => {
    console.log(`We are live on port ${port}`);
});