import dgram from "node:dgram";
import { Buffer } from "node:buffer";
import { generateMessage } from "./mesage.js";

const client = dgram.createSocket("udp4");

setInterval(() => {
  const MY_DATA = generateMessage();
  const message = Buffer.from(MY_DATA);
  client.send(message, 41234, "127.0.0.1", (err) => {
    console.log("Message sent!");
  });
}, 5000);


