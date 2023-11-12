import dgram from "node:dgram";
import { Buffer } from "node:buffer";

const client = dgram.createSocket("udp4");

setInterval(() => {
  const MY_DATA = generateMessage();
  const message = Buffer.from(MY_DATA);
  client.send(message, 41234, "127.0.0.1", (err) => {
    console.log("Message sent!");
  });
}, 5000);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function pickRandom(arr) {
  const idx = getRandomInt(arr.length);
  return arr[idx];
}

function generateRandomId() {
  const n = Math.random();
  const s = n.toString();
  const n1 = s[s.length - 3];
  const n2 = s[s.length - 2];
  const n3 = s[s.length - 1];

  return n1 + n2 + n3;
}

function generateEventDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hour = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  //const treatedDate = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;

  return `${year[2]}${year[3]}${month}${day}${hour}${minutes}${seconds}`;
}

function generateMessage() {
  const posibleTypes = [1, 2];
  const posibleProtocol = [66, 67, 68];
  const posibleStatus = [0, 1];
  const eventDate = generateEventDate();
  const eventType = pickRandom(posibleTypes);
  const eventProtocol = pickRandom(posibleProtocol);
  const eventStatus = pickRandom(posibleStatus);
  const eventId = generateRandomId();

  return `>DATA${eventType},${eventProtocol},${eventDate},${eventStatus},ID=${eventId}<`;
}
