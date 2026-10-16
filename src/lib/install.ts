import mysql from "mysql2/promise";

/** True when the install has already run (a users table with at least one row exists). */
export async function isInstalled(): Promise<boolean> {
  const conn = await mysql.createConnection({ uri: process.env.DATABASE_URL! });
  try {
    const [rows] = await conn.query("SELECT COUNT(*) AS n FROM users");
    return Number((rows as { n: number }[])[0]?.n) > 0;
  } catch (e) {
    if ((e as { code?: string }).code === "ER_NO_SUCH_TABLE") return false;
    throw e;
  } finally {
    await conn.end();
  }
}
