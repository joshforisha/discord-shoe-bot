import * as Entity from "./entity.js";
import * as Print from "./print.js";
import * as Skill from "./skill.js";

const actions = [...Entity.actions, ...Print.actions, ...Skill.actions];

export default actions;
