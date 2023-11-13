import pkg from "pg";
import format from "pg-format";
import "dotenv/config";
import fs from "fs";

const { Client } = pkg;

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_SCHEMA,
  port: parseInt(process.env.DB_PORT),
});

const startDataBase = async () => {
  await client.connect();
  await createTable();
  console.log("Database connected");
};

async function createTable() {
  const query = fs.readFileSync("./sql/create_table.sql", "utf8");

  await client.query(query);
}

async function saveMesage(msg) {
  const msgKeys = Object.keys(msg);
  const msgValues = Object.values(msg);

  const query = format(
    `
    INSERT INTO
        dev_status (%I)
    VALUES 
        (%L)
    RETURNING *;
  `,
    msgKeys,
    msgValues
  );

  await client.query(query);
}

export { client, startDataBase, saveMesage };
