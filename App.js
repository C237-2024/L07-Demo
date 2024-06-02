
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




//-------------------------------------------------------------------



// Start the server and listen on the specified port
app.listen(port, () => {
    // Log a message when the server is successfully started
    console.log(`Server is running at http://localhost:${port}`);
});
