import mysql from "mysql2/promise";

/**
 * One shared connection pool. Kept small on purpose — Hostinger shared plans
 * cap concurrent MySQL connections per user. Cached on globalThis so dev
 * hot-reload doesn't open a new pool on every change.
 */
const g = globalThis as unknown as { __pool?: mysql.Pool };

function createPool() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set. Copy .env.example to .env and fill it in.");
  const pool = mysql.createPool({
    uri: url,
    connectionLimit: Number(process.env.DB_POOL_SIZE || 5),
    waitForConnections: true,
    queueLimit: 0,
    enableKeepAlive: true,
    timezone: "Z",
    charset: "utf8mb4",
    namedPlaceholders: true,
    decimalNumbers: true,
  });
  // Store and read all timestamps in UTC.
  pool.on("connection", (conn) => {
    conn.query("SET time_zone = '+00:00'");
  });
  return pool;
}

export function getPool() {
  if (!g.__pool) g.__pool = createPool();
  return g.__pool;
}

type Params = Record<string, unknown> | unknown[];

export async function query<T = Record<string, unknown>>(sql: string, params: Params = {}): Promise<T[]> {
  const [rows] = await getPool().query(sql, params as never);
  return rows as T[];
}

export async function queryOne<T = Record<string, unknown>>(sql: string, params: Params = {}): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}

export async function execute(sql: string, params: Params = {}) {
  const [result] = await getPool().query(sql, params as never);
  return result as mysql.ResultSetHeader;
}

export async function transaction<T>(fn: (conn: mysql.PoolConnection) => Promise<T>): Promise<T> {
  const conn = await getPool().getConnection();
  try {
    await conn.beginTransaction();
    const out = await fn(conn);
    await conn.commit();
    return out;
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}
