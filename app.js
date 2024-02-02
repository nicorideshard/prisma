function consultBook() {
    const bookCode = document.getElementById('bookCode').value;

    // Fetch request to the book API
    fetch(`/api/books/${bookCode}`)
        .then(response => response.json())
        .then(book => {
            // Display book details in the UI
            document.getElementById('bookDetails').innerHTML = `
                <p>Libro: ${book.title}</p>
                <p>Autor: ${book.author}</p>
                <p>Costo: ${book.cost}</p>
            `;
        })
        .catch(error => {
            // Handle errors
            console.error('Error fetching book:', error);
        });
}
