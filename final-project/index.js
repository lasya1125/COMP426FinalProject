const express = require('express');

const app = express();
const User = require('./User.js');

// accepting all cors headers
const cors = require('cors');
app.use(cors());

//installs parsers of different types
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/user', (req, res) => {
    res.json(User.getAllIDs());
    return;
});

app.get('/user/:id', (req, res) => {
    let u = User.findByID(req.params.id);
    if (u == null) {
        res.status(404).send("User not found");
        return;
    }
    return res.json(u);
});

app.post('/user', (req, res) => {
    let { username, password, first, last, dietPlan, height, weight } = req.body;
    //need to add validity checkers for each of these values and send back status
    let u = User.createUser(username, password, first, last, dietPlan, height, weight);
    if (u == null) {
        res.status(400).send("Bad Request");
        return;
    }
    return res.json(u);
});

app.put('/user/:id', (req, res) => {
    let u = User.findByID(req.params.id);
    if (u == null) {
        res.status(404).send("User not found");
        return;
    }

    let { username, password, first, last, dietPlan, height, weight } = req.body;
    u.username = username;
    u.password = password;
    u.first = first;
    u.last = last;
    u.dietPlan = dietPlan;
    u.height = height;
    u.weight = weight;
    u.updateUser();
    res.json(u);
});

app.delete('/user/:id', (req, res) => {
    let u = User.findByID(req.params.id);
    if (u == null) {
        res.status(404).send("User not found");
        return;
    }
    u.deleteUser();
    res.json(true);
})

const port = 3030;
app.listen(port, () => {
    console.log("Tutorial1 up and running on port " + port);
});