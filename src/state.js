import Fs from "fs";

export let entities = [];

export function findEntity(entityStart) {
  const ent = entityStart.toLowerCase();
  return new Promise((resolve, reject) => {
    let index = entities.findIndex(({ name }) => name.toLowerCase() === ent);
    if (index > -1) {
      return resolve(index);
    }
    index = entities.reduce(
      (indices, { name }, i) =>
        name.toLowerCase().startsWith(ent) ? [...indices, i] : indices,
      []
    );
    console.log("index:", index);
    if (index.length > 1) {
      return reject(`Too many entities' names matched "${entityStart}"`);
    }
    if (index.length < 1) {
      return reject(`No entities' names matched "${entityStart}"`);
    }
    resolve(index[0]);
  });
}

export function saveEntities() {
  Fs.writeFile("entities.json", JSON.stringify(entities), (err) => {
    if (err) throw err;
  });
}

if (Fs.existsSync("entities.json")) {
  Fs.readFile("entities.json", (err, data) => {
    if (err) throw err;
    entities = JSON.parse(data);
  });
} else {
  saveEntities();
}
