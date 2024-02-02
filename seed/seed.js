// seeds/seed.js

const { PrismaClient } = require('../generated/client');

const inMemoryPrisma = new PrismaClient();

const { book, client, loan } = inMemoryPrisma;

async function seed() {
  try {
    // Remove all existing records from both Book and Client models
    await loan.deleteMany();
    await book.deleteMany();
    await client.deleteMany();

    // Create an array of book data
    const booksData = Array.from({ length: 5 }, (_, i) => ({
      code: i + 1,
      title: `title-${i}`,
      author: `author-${i}`,
      cost: 10,
    }));

    // Use create to insert each book record individually
    const books = [];
    for (const bookData of booksData) {
      const createdBook = await book.create({
        data: bookData,
      });
      books.push(createdBook);
    }

    console.log('Books Seeding successful:', books);

    // Create an array of client data
    const clientsData = Array.from({ length: 3 }, (_, i) => ({
      name: `Client-${i + 1}`,
      code: i + 1,
    }));

    // Use create to insert each client record individually
    const clients = [];
    for (const clientData of clientsData) {
      const createdClient = await client.create({
        data: clientData,
      });
      clients.push(createdClient);
    }

    // Create an array of loan data and relate books and clients
    const loansData = [
      {
        clientId: clients[0].id,
        bookId: books[0].id,
      },
      {
        clientId: clients[1].id,
        bookId: books[1].id,
      },
      {
        clientId: clients[2].id,
        bookId: books[2].id,
      },
    ];

    // Use create to insert each loan record individually
    const loans = [];
    for (const loanData of loansData) {
      const createdLoan = await loan.create({
        data: loanData,
      });
      loans.push(createdLoan);
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await inMemoryPrisma.$disconnect();
  }
}

seed();
