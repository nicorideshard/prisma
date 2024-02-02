const express = require('express');
const { PrismaClient } = require('./generated/client')

const app = express();

const inMemoryPrisma = new PrismaClient()

app.use(express.json());

// Define Prisma models
const { book, client, loan } = inMemoryPrisma;

// API endpoint to retrieve book details
app.get('/api/books/:code', async (req, res) => {
    const bookCode = parseInt(req.params.code);

    try {
        const selectedBook = await book.findUnique({
            where: { code: bookCode }
        });

        if (selectedBook) {
            res.json(selectedBook);
        } else {
            res.status(404).json({ error: 'Libro con código no existente' });
        }
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// API endpoint to list all available books
app.get('/api/books', async (req, res) => {
    try {
      const availableBooks = await book.findMany();
      res.json(availableBooks);
    } catch (error) {
      console.error('Error fetching available books:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

// API endpoint to list all available clients
app.get('/api/clients', async (req, res) => {
    try {
      const clients = await client.findMany();
      res.json(clients);
    } catch (error) {
      console.error('Error fetching available clients:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

// API endpoint to list all available loans
app.get('/api/loans', async (req, res) => {
    try {
      const loans = await loan.findMany();
      res.json(loans);
    } catch (error) {
      console.error('Error fetching available loans:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });
  
  // API endpoint to perform a loan for a client
  app.post('/api/loan', async (req, res) => {
    const { clientId, bookCode } = req.body;
  
    try {
      // Check if the client and book exist
      const selectedClient = await client.findUnique({
        where: { id: clientId },
      });
  
      const selectedBook = await book.findUnique({
        where: { code: bookCode },
      });
  
      if (!selectedClient || !selectedBook) {
        return res.status(404).json({ error: 'Cliente o libro no encontrado' });
      }
  
      // Perform the loan operation (you can implement your logic here)
  
      res.json({ success: true, message: 'Préstamo exitoso' });
    } catch (error) {
      console.error('Error performing loan:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    // Synchronize Prisma models with the in-memory database
    await inMemoryPrisma.$connect();
    await inMemoryPrisma.$executeRaw`PRAGMA foreign_keys = ON;`;
    
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
    await inMemoryPrisma.$disconnect();
    process.exit();
});
