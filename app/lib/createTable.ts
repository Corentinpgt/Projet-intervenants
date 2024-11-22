import { db } from '@/app/lib/db'; // Assurez-vous que le fichier db.ts exporte correctement la connexion à la base de données

async function createTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS intervenants (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      firstname VARCHAR(100) NOT NULL,
      lastname VARCHAR(100) NOT NULL,
      key VARCHAR(255) NOT NULL,
      creationdate DATE NOT NULL,
      enddate DATE NOT NULL,
      availability VARCHAR(255) NOT NULL
    );
  `;

  try {
    const client = await db.connect();
    await client.query(createTableQuery);
    client.release();
    console.log('Table "intervenants" created or already exists.');
  } catch (err) {
    console.error('Error creating table:', err);
  }
}

createTable();
