import * as Dice from "./dice.js";
import * as Entity from "./entity.js";
import * as Experience from "./experience.js";
import * as Print from "./print.js";
import * as Skill from "./skill.js";

const actions = [
  ...Dice.actions,
  ...Entity.actions,
  ...Experience.actions,
  ...Print.actions,
  ...Skill.actions,
];

export default actions;
