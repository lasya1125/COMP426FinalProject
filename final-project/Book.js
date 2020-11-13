const book_data = require('data-store')({ path: process.cwd() + '/final-project/data/book.json' })

class Book {
    constructor(id, title, price, authors) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.authors = authors;
    }
}

Book.getAllIDs = () => {
    //return an array of all book ids
    return Object.keys(book_data.data).map((id => { return parseInt(id); }));
}

Book.findByID = (id) => {
    //return book by id
    return book_data.get(id);
}

Book.nextID = Book.getAllIDs().reduce((max, next_id) => {
    if (max < next_id) {
        return next_id;
    }
    return max;
}, -1) + 1;

Book.createBook = (title, price, author) => {
    let id = Book.nextID;
    Book.next_id += 1;
    let b = new Book(id, title, price, authors);
    book_data.set(b.id.toString(), b);
    return b;
}

// let b1 = new Book(0, "My First Book", 10.50, ['KMP', 'Lasya']);
// book_data.set(b1.id.toString(), b1);

module.exports = Book;