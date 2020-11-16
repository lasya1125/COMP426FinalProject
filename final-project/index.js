const express = require('express');

const app = express();
const User = require('./User.js');

// accepting all cors headers
const cors = require('cors');
app.use(cors());

//installs parsers of different types
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const expressSession = require('express-session');

app.use(expressSession({
    name: "kmpSessionCookie",
    secret: "express session secret",
    resave: false,
    saveUninitialized: false
}));

const login_data = require('data-store')({ path: process.cwd() + '/data/user.json' });

app.post('/login', (req,res) => {
    let user = req.body.user;
    let password = req.body.password;

    let user_data = login_data.get(user);
    if (user_data == null){
        res.status(404).send("Not found");
        return;
    }
    if(user_data.password == password){
        console.log("User " + user + " credentials valid");
        req.session.user = user;
        res.json(true);
        return;
    }
    res.status(403).send("Unauthorized");
});

app.get('/logout', (req, res) => {
    delete req.session.user;
    res.json(true);
})

app.get('/secret', (req, res) => {
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
        return;
    }
    res.json(User.getAllIDsForOwner(req.session.user));
    return;
});

app.get('/secret/:id', (req, res) => {
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
        return;
    }
    let s = User.findByID(req.params.id);
    if (s == null) {
        res.status(404).send("Not found");
        return;
    }
    if (s.owner != req.session.user) {
        res.status(403).send("Unauthorized");
        return;
    }
    res.json(s);
} );


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
    let { owner, secret, first, last, dietPlan, height, weight } = req.body;
    //need to add validity checkers for each of these values and send back status
    let u = User.createUser(owner, secret, first, last, dietPlan, height, weight);
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

    let { owner, secret, first, last, dietPlan, height, weight } = req.body;
    u.owner = owner;
    u.secret = secret;
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