
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.set('view engine', 'ejs');

// In-memory data for students
let books = [
    { id: 1, title: 'Harry Potter', author: 'J.K. Rowling', year: 1997 },
    { id: 2, title: 'The Da Vinci Code', author: 'Dan Brown', year: 2003 },
    { id: 3, title: 'The Alchemist', author: 'Paulo Coelho', year: 1988 }
];


//RESTful API
//-------------------------------------------------------------------


//GET /books
app.get('/books', function(req, res) {
    res.json(books);
});

//GET /books/1
app.get('/books/:id', function(req, res) {
    const id = req.params.id;
    let book = books.find(b => b.id == id);
    if (!book) {
        res.json({ error: 'Book not found' });
        return;
    }
    res.json(book);
});

//POST /books
app.post('/books', function(req, res) {
    const title = req.body.title;
    const author = req.body.author;
    const year = req.body.year;

    //generate a new id
    const id = books[books.length-1].id + 1;

    //create a new book object
    const book = { id, title, author, year };

    //add the book to the array
    books.push(book);

    //return the newly created book
    res.json(book);
});

//PUT /books/1
app.put('/books/:id', function(req, res) {
    const id = req.params.id;
    const title = req.body.title;
    const author = req.body.author;
    const year = req.body.year;

    let book = books.find(b => b.id == id);
    if (!book) {
        res.json({ error: 'Book not found' });
        return;
    }

    //update the book in the array
    book.title = title;
    book.author = author;
    book.year = year;

    //return the newly updated book
    res.json(book);
});


//DELETE /books/1
app.delete('/books/:id', function(req, res) {
    const id = req.params.id;
    let book = books.find(b => b.id == id);
    if (!book) {
        res.json({ error: 'Book not found' });
        return;
    }

    //option 1 - filter
    books = books.filter(b => b.id != id);


    //option 2 - loops
    for (let i = 0; i < books.length; i++) {
        if (books[i].id == id) {
            books.remove(i);
            break;
        }
    }

    //return the deleted book
    res.json(book);
});




//UI Routes
//-------------------------------------------------------------------


app.get('/', function(req, res) {
    //res.write('<h1>Hello World</h1>');
    //res.end();

    res.sendFile(__dirname + '/homepage.html');
});


app.get('/viewAllBooks', function(req, res) {

    //display books in html format
    let html = '<h1>Books</h1>';
    html += '<ul>';
    for (let book of books) {
        html += `<li> (${book.id}): ${book.title} by ${book.author} (${book.year})</li>`;
    }
    html += '</ul>';
    res.send(html);
    
    return;

    //render the allbooks.ejs view
    res.render('view_books', { books });
});



app.get('/viewBook/:id', function(req, res) {
    const id = req.params.id;
    
    //option 1
    //use find method to search books for book with id
    let book = books.find(b => b.id == id);
    
    //option 2
    //use for loop to search books for book with id
    for (let i = 0; i < books.length; i++) {
         if (books[i].id == id) {
             book = books[i];
             break;
         }
    }

    //what if book is not found?
    if (!book) {
        res.send('Book not found');
        return;
    }

    res.render('view_book', { book });
});


app.get('/addBook', function(req, res) {
    res.render('add_book');
});

app.post('/addBook', function(req, res) {   
    const title = req.body.title;
    const author = req.body.author;
    const year = req.body.year;

    const id = books[books.length-1].id + 1;
    const book = { id, title, author, year };
    books.push(book);

    //redirect to viewAllBooks
    res.redirect('/viewAllBooks');
});



app.get('/editBook/:id', function(req, res) {
    const id = req.params.id;
    let book = books.find(b => b.id == id);
    if (!book) {
        res.send('Book not found');
        return;
    }

    res.render('edit_book', { book });
});


app.post('/editBook/:id', function(req, res) {
    const id = req.params.id;
    const title = req.body.title;
    const author = req.body.author;
    const year = req.body.year;

    let book = books.find(b => b.id == id);
    if (!book) {
        res.send('Book not found');
        return;
    }

    book.title = title;
    book.author = author;
    book.year = year;

    res.redirect('/viewAllBooks');
});



app.get('/deleteBook/:id', function(req, res) {
    const id = req.params.id;
    let book = books.find(b => b.id == id);
    if (!book) {
        res.send('Book not found');
        return;
    }

    res.render('delete_book', { book });
});

app.post('/deleteBook/:id', function(req, res) {
    const id = req.params.id;
    let book = books.find(b => b.id == id);
    if (!book) {
        res.send('Book not found');
        return;
    }

    books = books.filter(b => b.id != id);
    res.redirect('/viewAllBooks');
});


//-------------------------------------------------------------------



// Start the server and listen on the specified port
app.listen(port, () => {
    // Log a message when the server is successfully started
    console.log(`Server is running at http://localhost:${port}`);
});
