import { ensp, numberEmoji } from "../view.js";

function d6() {
  return Math.floor(1 + Math.random() * 6);
}

function initialize(num, value) {
  const list = [];
  for (let i = 0; i < num; i++) {
    list.push(value(num));
  }
  return list;
}

export const actions = [
  {
    command: "roll",
    shortcut: "r",
    args: ["num"],
    description: "Roll *num* d6 dice",
    run: ([num], resolve, reject) => {
      const numDice = parseInt(num, 10);
      if (Number.isNaN(numDice) || numDice < 1) {
        return reject("Invalid dice number");
      }
      const rolls = initialize(numDice, d6);
      const total = rolls.reduce((y, x) => y + x, 0);
      const rollsText = rolls.map(numberEmoji).join(" ");
      resolve((channel) => {
        channel.send("", {
          embed: {
            color: 0xfafafa,
            description: `${rollsText}${ensp}➤${ensp}**${total}**`,
          },
        });
      });
    },
  },
];
