const express = require('express');

const app = express();
const Book = require('./Book.js');

//installs parsers of different types
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/book', (req, res) => {
    res.json(Book.getAllIDs());
    return;
});

app.get('/book/:id', (req, res) => {
    let b = Book.findByID(req.params.id);
    if (b == null) {
        res.status(404).send("Book not found");
        return;
    }
    return res.json(b);
});

// Set this Access-Control-Allow-Methods to a comma separated list of all the methods we want to allow
// and set Access-Control-Allow-Origin : *

app.post('/book', (req, res) => {
    let { title, price, authors } = req.body;
    //need to add validity checkers for each of these values and send back status
    let b = Book.createBook(title, price, authors);
    if (b == null) {
        res.status(400).send("Bad Request");
        return;
    }
    return res.json(b);
});

const port = 3030;
app.listen(port, () => {
    console.log("Tutorial1 up and running on port " + port);
});