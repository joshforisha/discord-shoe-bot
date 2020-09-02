import { entities } from "./state.js";

export function sendEntities(channel) {
  if (entities.length < 1) {
    return sendError("No entities!")(channel);
  }
  channel.send("", {
    embed: {
      color: 0x706fd3,
      fields: entities.map(({ name, skills }) => ({
        name,
        value: skills.map((skill) => `> ${skill}`),
      })),
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
