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

function parseDate(date) {
  const year = parseInt("20" + date[0] + date[1]);
  const month = parseInt(date[2] + date[3]);
  const day = parseInt(date[4] + date[5]);
  const hours = parseInt(date[6] + date[7]);
  const minutes = parseInt(date[8] + date[9]);
  const seconds = parseInt(date[10] + date[11]);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function parseMesage(msg) {
  let [type, protocolo, date, status, id] = String(msg).slice(5, -1).split(",");

  return {
    type: parseInt(type),
    protocolo: parseInt(protocolo),
    utc: parseDate(date),
    status: parseInt(status),
    id: id.replace("ID=", ""),
  };
}

export { generateMessage, parseMesage };
