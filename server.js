import dgram from "node:dgram";
import { saveMesage, startDataBase } from "./database.js";
import { parseMesage, validateMesage } from "./mesage.js";

const server = dgram.createSocket("udp4");

server.on("error", (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on("message", (msg, rinfo) => {
  const parsedMsg = parseMesage(msg);
  const isValidMsg = validateMesage(parsedMsg);
  
  if (isValidMsg) {
    saveMesage(parsedMsg);
  } else {
    console.log(`Invalid message: ${msg}`)
  }

  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on("listening", async () => {
  await startDataBase();
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);
