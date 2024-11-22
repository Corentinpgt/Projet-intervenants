import {db} from '@/app/lib/db';
import { Intervenant } from '@/app/lib/definition';


export async function createTable() {
    const client = await db.connect();
    try {
        const query = `
            CREATE TABLE intervenants (
            id SERIAL PRIMARY KEY,
            email VARCHAR(100) UNIQUE NOT NULL,
            firstname VARCHAR(100) NOT NULL,
            lastname VARCHAR(100) NOT NULL,
            key VARCHAR(100) NOT NULL,
            creationdate DATE NOT NULL,
            enddate DATE NOT NULL,
            availability TEXT
            );
        `;
        await client.query(query);
    } finally {
        client.release();
    }
}

// export async function fetchIntervenants(): Promise<Intervenant[]> {
//   try {
//     const client = await db.connect();
//     const res = await client.query('SELECT * FROM intervenants');
//     client.release();
//     return res.rows as Intervenant[];
//   } catch (error: any) {
//     console.error('Erreur lors de la récupération des intervenants :', error);
//     throw error;
//   }
// }

export async function fetchIntervenants(): Promise<Intervenant[]> {
    try {
      const client = await db.connect();
      const res = await client.query('SELECT * FROM intervenants');
      client.release();
      return res.rows as Intervenant[];
    } catch (error: any) {
      console.error("Error in fetchIntervenants:", error);
      throw error;
    }

}
  

export async function addIntervenant(email: string, firstname: string, lastname: string, key: string, creationdate: string, enddate: string, availability: string) {
    try {
        const client = await db.connect();
        const res = await client.query(
            'INSERT INTO intervenants (email, firstname, lastname, key, creationdate, enddate, availability) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [email, firstname, lastname, key, creationdate, enddate, availability]
        );
        client.release();
        return res.rows[0];
    } catch (error: any) {
        console.error("Error in addIntervenant:", error);
        throw error;
    }
}
  
  // export async function addAnonymousIntervenants() {
  //   const client = await db.connect();
  //   try {
  //     const intervenants = [
  //       { email: 'intervenant.A@unilim.fr', firstname: 'Intervenant', lastname: 'A', key: 'A-key', creationdate: '2024-11-10', enddate: '2025-05-11', availability: '' },
  //       { email: 'intervenant.B@unilim.fr', firstname: 'Intervenant', lastname: 'B', key: 'B-key', creationdate: '2024-11-10', enddate: '2025-05-11', availability: '' },
  //       // Ajoutez d'autres intervenants anonymes ici
  //     ];
  
  //     for (const interv of intervenants) {
  //       await client.query(
  //         'INSERT INTO intervenants (email, firstname, lastname, key, creationdate, enddate, availability) VALUES ($1, $2, $3, $4, $5, $6, $7)',
  //         [interv.email, interv.firstname, interv.lastname, interv.key, interv.creationdate, interv.enddate, interv.availability]
  //       );
  //     }
  //   } finally {
  //     client.release();
  //   }
  // }