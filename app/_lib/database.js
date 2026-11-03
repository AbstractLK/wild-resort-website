import mysql from 'mysql2/promise';

const isLocal =
  process.env.DATABASE_HOST === 'localhost' ||
  process.env.DATABASE_HOST === '127.0.0.1';

const useSSL =
  process.env.DATABASE_SSL === 'true' ||
  (process.env.DATABASE_SSL !== 'false' && !isLocal);

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: Number(process.env.DATABASE_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  decimalNumbers: true,
  dateStrings: true,
  ssl: useSSL ? { minVersion: 'TLSv1.2', rejectUnauthorized: true } : undefined,
});

export { pool };
