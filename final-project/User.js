const user_data = require('data-store')({ path: process.cwd() + '/final-project/data/user.json' })

class User {
    constructor(id, username, password, first, last, dietPlan, height, weight) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.first = first;
        this.last = last;
        this.dietPlan = dietPlan;
        this.height = height;
        this.weight = weight;
    }

    updateUser() {
        user_data.set(this.id.toString(), this);
    }

    deleteUser() {
        user_data.del(this.id.toString());
    }
}

User.getAllIDs = () => {
    return Object.keys(user_data.data).map((id => { return parseInt(id); }));
}

User.findByID = (id) => {
    let udata = user_data.get(id);
    if (udata == null) {
        return null;
    }
    return new User(udata.id, udata.username, udata.password, udata.first, udata.last, udata.dietPlan, udata.height, udata.weight);
}

User.nextID = User.getAllIDs().reduce((max, next_id) => {
    if (max < next_id) {
        return next_id;
    }
    return max;
}, -1) + 1;

User.createUser = (username, password, first, last, dietPlan, height, weight) => {
    let id = User.nextID;
    User.nextID += 1;
    let u = new User(id, username, password, first, last, dietPlan, height, weight);
    user_data.set(u.id.toString(), u);
    return u;
}

module.exports = User;