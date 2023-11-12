import dgram from "node:dgram";
import { client, startDataBase } from "./database.js";
import format from "pg-format";

const server = dgram.createSocket("udp4");

server.on("error", (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

function parseMesage(msg) {
  const msgArray = `${msg}`.split(",");

  const type = msgArray[0] === ">DATA1" ? 1 : 2;
  
  const protocolo = parseInt(msgArray[1]);
  const year = parseInt("20" + msgArray[2][0] + msgArray[2][1]);
  const month = parseInt(msgArray[2][2] + msgArray[2][3]);
  const day = parseInt(msgArray[2][4] + msgArray[2][5]);
  const hours = parseInt(msgArray[2][6] + msgArray[2][7]);
  const minutes = parseInt(msgArray[2][8] + msgArray[2][9]);
  const seconds = parseInt(msgArray[2][10] + msgArray[2][11]);
  const utc = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const status = parseInt(msgArray[3]);
  const id = msgArray[4][3] + msgArray[4][4] + msgArray[4][5];

  return {
    type,
    protocolo,
    utc,
    status,
    id,
  };
}

async function saveMesageToDataBase(msg) {
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

  await client.query(query)
}

server.on("message", (msg, rinfo) => {
  saveMesageToDataBase(msg);
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on("listening", async () => {
  await startDataBase();
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);
