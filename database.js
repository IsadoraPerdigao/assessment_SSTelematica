import pkg from "pg";
import format from "pg-format";
import "dotenv/config";

const { Client } = pkg;

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB,
  port: parseInt(process.env.DB_PORT),
});

const startDataBase = async () => {
  await client.connect();
  console.log("Database connected");
};

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
