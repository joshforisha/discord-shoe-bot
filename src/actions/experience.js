import { entities, findEntity, saveEntities } from "../state.js";

export const actions = [
  {
    command: "xp-clear",
    args: ["entity"],
    description: "Remove all XP from *entity*",
    adminOnly: true,
    run: ([entityStart], resolve, reject) => {
      findEntity(entityStart)
        .then((e) => {
          delete entities[e].xp;
          resolve();
          saveEntities();
        })
        .catch(reject);
    },
  },
  {
    command: "xp-give",
    args: ["entity"],
    description: "Give 1 XP to *entity*",
    adminOnly: true,
    run: ([entityStart], resolve, reject) => {
      findEntity(entityStart)
        .then((e) => {
          if (!("xp" in entities[e])) entities[e].xp = 1;
          else {
            entities[e].xp += 1;
          }
          resolve();
          saveEntities();
        })
        .catch(reject);
    },
  },
  {
    command: "xp-take",
    args: ["num", "entity"],
    description: "Take *num* XP from *entity*",
    adminOnly: true,
    run: ([num, entityStart], resolve, reject) => {
      const numTake = parseInt(num, 10);
      if (Number.isNaN(numTake)) return reject("Invalid XP number");
      findEntity(entityStart)
        .then((e) => {
          if (!("xp" in entities[e])) {
            return reject(`No XP for "${entities[e].name}"`);
          }
          if (numTake >= entities[e].xp) {
            delete entities[e].xp;
          } else {
            entities[e].xp -= numTake;
          }
          resolve();
          saveEntities();
        })
        .catch(reject);
    },
  },
];
