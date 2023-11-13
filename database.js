import pkg from "pg";
import format from "pg-format";
import { parseMesage } from "./mesage.js";

const { Client } = pkg;

const client = new Client({
  user: "isadora",
  password: "q1q2q3",
  host: "localhost",
  database: "ss_telematica_teste",
  port: 5432,
});

const startDataBase = async () => {
  await client.connect();
  console.log("Database connected");
};

async function saveMesage(msg) {
  const msgToSave = parseMesage(msg);
  const msgKeys = Object.keys(msgToSave);
  const msgValues = Object.values(msgToSave);

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
