import { Pool } from "pg";

const pool = new Pool({
  user: process.env.PGUSER,      // AWS RDS username
  host: process.env.PGHOST,      // AWS RDS endpoint/host
  database: process.env.PGDATABASE,  // Database name
  password: process.env.PGPASSWORD,  // Password
  port: 5432,  // Default PostgreSQL port
  ssl: { rejectUnauthorized: false }, // If using AWS RDS
});

pool.query('SELECT 1')
  .then(() => console.log('DB connection successful!'))
  .catch(err => console.error('DB connection error:', err));

export default pool;
