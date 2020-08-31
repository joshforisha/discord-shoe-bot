import { entities, findEntity, saveEntities } from "../state.js";

export const actions = [
  {
    command: "entity-add",
    args: ["name"],
    description: "Add an entity *name*",
    adminOnly: true,
    run: ([name], resolve) => {
      entities.push({
        name,
        skills: ["Do anything 1"],
      });
      resolve();
      saveEntities();
    },
  },
  {
    command: "entity-remove",
    args: ["name"],
    description: "Remove an entity *name*",
    adminOnly: true,
    run: ([name], resolve, reject) => {
      findEntity(name)
        .then((e) => {
          delete entities[e];
          resolve();
          saveEntities();
        })
        .catch(reject);
    },
  },
];
