import pkg from 'pg';

const { Client } = pkg;

const client = new Client({
    user: "isadora",
    password: "q1q2q3",
    host: "localhost",
    database: "ss_telematica_teste",
    port: 5432
})

const startDataBase = async() => {
    await client.connect()
    console.log("Database connected")
}

export { client, startDataBase }