import { DataSource } from "typeorm" // config koneksi ke db

import { SUPABASE_URL } from "./config"
import path from "path"

export const PMADB = new DataSource({
  type: "postgres",
  url: SUPABASE_URL || "",
  synchronize: false, //khusus development, kalo production false
  logging: true, // log apapun yg terjadi di db
  entities: [path.join(__dirname, "/entities/*.{js,ts}")], // models
  migrations: [path.join(__dirname, "/migrations/*.{js,ts}")], // penambahan apa pada tabel, satu tabel satu migration
  // username: "postgres",
  // password: "postgres",
  // host: "localhost",
  // port:3306
  // database: "kevdb",
}) // bisa multiple koneksi dbnya caranya sama
