const loanForm = document.getElementById('loan-form');
const clientName = document.getElementById('client-name');
const booksTable = document.getElementById('books-table');

// Fetch clients and books when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const clientsResponse = await fetch('http://localhost:3000/clients');
    const clients = await clientsResponse.json();

    const booksResponse = await fetch('http://localhost:3000/books');
    const books = await booksResponse.json();

    // Display clients and books in the table
    displayClientsAndBooks(clients, books);
});

// Handle form submission
loanForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Fetch books by client name
    const response = await fetch(`http://localhost:3000/books?clientName=${clientName.value}`);
    const books = await response.json();

    // Display fetched books in the table
    booksTable.innerHTML = '';
    displayBooks(books);
});

// Display clients and books in the table
function displayClientsAndBooks(clients, books) {
    // Display clients
    const clientsSelect = document.getElementById('clients');
    clients.forEach((client) => {
      const option = document.createElement('option');
      option.value = client.name;
      option.textContent = client.name;
      clientsSelect.appendChild(option);
    });
  
    // Display books
    if (books.length > 0) {
      displayBooks(books);
    } else {
      const row = booksTable.insertRow();
      const noBooksCell = row.insertCell();
      noBooksCell.colSpan = 6;
      noBooksCell.textContent = 'No books available.';
    }
  }

// Display books in the table
function displayBooks(books) {
    books.forEach((book) => {
      const row = booksTable.insertRow();
      row.dataset.bookId = book._id;
  
      const titleCell = row.insertCell();
      titleCell.textContent = book.title;
  
      const authorCell = row.insertCell();
      authorCell.textContent = book.author;
  
      const numPagesCell = row.insertCell();
      numPagesCell.textContent = book.numPages;
  
      const totalCell = row.insertCell();
      totalCell.textContent = book.total;
  
      const digitalCell = row.insertCell();
      digitalCell.textContent = book.digital ? 'Yes' : 'No';
  
      const actionsCell = row.insertCell();
      const loanButton = document.createElement('button');
      loanButton.textContent = 'Loan';
      loanButton.addEventListener('click', () => loanBook(book));
      const returnButton = document.createElement('button');
      returnButton.textContent = 'Return';
      returnButton.addEventListener('click', () => returnBook(book));
      actionsCell.appendChild(loanButton);
      actionsCell.appendChild(returnButton);
    });
  }

// Loan a book
async function loanBook(book) {
    // Check if the book is available for loan
    if (book.total > 0) {
      // Create a loan object
      const loan = {
        clientName: clientName.value,
        bookId: book._id,
      };
  
      // Send a POST request to loan the book
      const response = await fetch('http://localhost:3000/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loan),
      });
  
      // Check if the loan was successful
      if (response.ok) {
        // Update the book's total
        book.total--;
  
        // Update the actions cell
        const actionsCell = document.querySelector(`tr[data-book-id="${book._id}"] td:last-child`);
        actionsCell.innerHTML = '';
        const loanButton = document.createElement('button');
        loanButton.textContent = 'Loan';
        loanButton.addEventListener('click', () => loanBook(book));
        const returnButton = document.createElement('button');
        returnButton.textContent = 'Return';
        returnButton.addEventListener('click', () => returnBook(book));
        actionsCell.appendChild(loanButton);
        actionsCell.appendChild(returnButton);
      } else {
        alert('Error: Unable to loan the book.');
      }
    } else {
      alert('Error: The book is not available for loan.');
    }
  }
  
  // Return a book
  async function returnBook(book) {
    // Send a DELETE request to return the book
    const response = await fetch(`http://localhost:3000/loans/${book.loanId}`, {
      method: 'DELETE',
    });
  
    // Check if the return was successful
    if (response.ok) {
      // Update the book's total
      book.total++;
  
      // Update the actions cell
      const actionsCell = document.querySelector(`tr[data-book-id="${book._id}"] td:last-child`);
      actionsCell.innerHTML = '';
      const loanButton = document.createElement('button');
      loanButton.textContent = 'Loan';
      loanButton.addEventListener('click', () => loanBook(book));
      const returnButton = document.createElement('button');
      returnButton.textContent = 'Return';
      returnButton.addEventListener('click', () => returnBook(book));
      actionsCell.appendChild(loanButton);
      actionsCell.appendChild(returnButton);
    } else {
      alert('Error: Unable to return the book.');
    }
  }