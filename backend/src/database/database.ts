import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db: Database | null = null;

export async function getDb(): Promise<Database> {
  if (db) {
    return db;
  }

  db = await open({
    filename: path.resolve(__dirname, '../../sectors.db'),
    driver: sqlite3.Database,
  });

  await db.exec('PRAGMA foreign_keys = ON;');

  return db;
}
