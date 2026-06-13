import Database from "better-sqlite3";

const db = new Database("database.sqlite");

db.exec(`
  CREATE TABLE IF NOT EXISTS maps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS camera_positions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    map_id INTEGER NOT NULL,
    camera_id TEXT NOT NULL,
    x REAL NOT NULL,
    y REAL NOT NULL,
    UNIQUE(map_id, camera_id)
  );
  
CREATE TABLE IF NOT EXISTS app_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  wave_ip TEXT DEFAULT '',
  wave_port TEXT DEFAULT '7001',
  wave_user TEXT DEFAULT '',
  wave_password TEXT DEFAULT '',
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

`);

export default db;