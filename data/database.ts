import { kvdex } from "kvdex";

const kv = await Deno.openKv();

const db = kvdex(kv, {});

export default db;
