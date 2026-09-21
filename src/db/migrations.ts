import type { SQLiteDatabase } from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 3;

  const result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  );

  let currentVersion = result?.user_version ?? 0;

  if (currentVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS app_settings (
        key TEXT PRIMARY KEY NOT NULL,
        value TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY NOT NULL,
        title_es TEXT NOT NULL,
        title_en TEXT NOT NULL,
        description_es TEXT,
        description_en TEXT,
        category TEXT NOT NULL,
        is_completed INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS bulletins (
        id INTEGER PRIMARY KEY NOT NULL,
        title_es TEXT NOT NULL,
        title_en TEXT NOT NULL,
        content_es TEXT NOT NULL,
        content_en TEXT NOT NULL,
        severity TEXT NOT NULL,
        source TEXT NOT NULL,
        published_at TEXT NOT NULL,
        is_read INTEGER NOT NULL DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS weather_cache (
        id INTEGER PRIMARY KEY NOT NULL,
        location_name TEXT NOT NULL,
        temperature REAL,
        condition_es TEXT,
        condition_en TEXT,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS map_points (
        id INTEGER PRIMARY KEY NOT NULL,
        name_es TEXT NOT NULL,
        name_en TEXT NOT NULL,
        category TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        address_es TEXT,
        address_en TEXT
      );
    `);

    currentVersion = 1;
  }

  if (currentVersion === 1) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS custom_locations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        notes TEXT,
        created_at TEXT NOT NULL
      );
    `);

    currentVersion = 2;
  }

  if (currentVersion === 2) {
  await db.execAsync(`
    ALTER TABLE weather_cache ADD COLUMN humidity REAL;
    ALTER TABLE weather_cache ADD COLUMN wind_speed REAL;
    ALTER TABLE weather_cache ADD COLUMN weather_code INTEGER;
  `);
  currentVersion = 3;
}

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}