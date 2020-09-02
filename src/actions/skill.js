import { entities, findEntity, saveEntities } from "../state.js";

export const actions = [
  {
    command: "skill-add",
    args: ["entity", "...skill"],
    description: "Add *skill* to *entity*",
    run: ([entityStart, ...skill], resolve, reject) => {
      findEntity(entityStart)
        .then((e) => {
          entities[e].skills.push(skill.join(" "));
          saveEntities();
          resolve();
        })
        .catch(reject);
    },
  },
  {
    command: "skill-remove",
    args: ["entity", "skill"],
    description: "Remove *skill* from *entity*",
    run: ([entityStart, skillStart], resolve, reject) => {
      findEntity(entityStart)
        .then((e) => {
          const ski = skillStart.toLowerCase();
          let skillIndex = entities[e].skills.findIndex(
            (skill) => skill.toLowerCase() === ski
          );
          if (skillIndex > -1) {
            entities[e].skills.splice(skillIndex, 1);
          } else {
            skillIndex = entities[e].skills.reduce(
              (indices, skill, i) =>
                skill.toLowerCase().startsWith(ski) ? [...indices, i] : indices,
              []
            );
            if (skillIndex.length > 1) {
              return reject(`Too many skills start with "${skillStart}"`);
            }
            if (skillIndex.length < 1) {
              return reject(`No skills found starting with "${skillStart}"`);
            }
            entities[e].skills.splice(skillIndex[0], 1);
          }
          saveEntities();
          resolve();
        })
        .catch(reject);
    },
  },
];
