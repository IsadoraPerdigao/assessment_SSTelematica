import dgram from "node:dgram";
import "dotenv/config";
import { Buffer } from "node:buffer";
import { generateMessage } from "./mesage.js";

const UDP_SERVER_HOST = process.env.UDP_SERVER_HOST;
const UDP_SERVER_PORT = process.env.UDP_SERVER_PORT;
const MESSAGE_INTERVAL = process.env.CLIENT_MESSAGE_INTERVAL_MS;

const client = dgram.createSocket("udp4");

setInterval(() => {
  const MY_DATA = generateMessage();
  const message = Buffer.from(MY_DATA);
  console.log("Sending message", MY_DATA);
  client.send(message, UDP_SERVER_PORT, UDP_SERVER_HOST, (err) => {});
}, MESSAGE_INTERVAL);
