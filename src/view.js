import { entities } from "./state.js";

export const ensp = " ";

export function numberEmoji(num) {
  switch (num) {
    case 0:
      return ":zero:";
    case 1:
      return ":one:";
    case 2:
      return ":two:";
    case 3:
      return ":three:";
    case 4:
      return ":four:";
    case 5:
      return ":five:";
    case 6:
      return ":six:";
    case 7:
      return ":seven:";
    case 8:
      return ":eight:";
    case 9:
      return ":nine:";
  }
}

export function sendEntities(channel) {
  if (entities.length < 1) {
    return sendError("No entities!")(channel);
  }
  channel.send("", {
    embed: {
      color: 0x706fd3,
      fields: entities.map(({ name, skills, xp }) => {
        const xpText = typeof xp === "number" ? `${ensp}\`${xp} XP\`` : "";
        return {
          name: `${name}${xpText}`,
          value: skills.map((skill) => `> ${skill}`),
        };
      }),
    },
  });
}

export function sendError(errorMessage) {
  return (channel) => {
    channel.send("", {
      embed: {
        color: 0xff5252,
        description: errorMessage,
      },
    });
  };
}
