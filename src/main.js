import actions from "./actions/all.js";
import Dotenv from "dotenv";
import { Client } from "discord.js";
import { sendEntities, sendError } from "./view.js";

Dotenv.config();

const adminRoleName = "GM";
const prefix = "-";
const discordClient = new Client();

const usageFields = actions
  .sort((a, b) => (a.command < b.command ? -1 : 1))
  .map(({ args, command, description, shortcut }) => {
    const argsText = args ? args.map((a) => `*${a}*`).join(" ") : "";
    return {
      name: `${prefix}${command}${argsText.length ? " " : ""}${argsText}`,
      value: [
        description,
        shortcut ? `Shortcut: \`${prefix}${shortcut}\`` : null,
      ],
    };
  });

process.on("SIGINT", () => {
  discordClient.destroy();
  console.log("Disconnected");
  process.exit(0);
});

function sendUsage(channel) {
  channel.send("", {
    embed: {
      color: 0x34ace0,
      title: "Commands",
      description: `All commands are prefixed with \`${prefix}\``,
      fields: usageFields,
    },
  });
}

discordClient.on("message", ({ author, content, channel, guild, member }) => {
  if (author.bot || !content.startsWith(prefix)) return;

  const adminRole = guild.roles.cache.find(
    (role) => role.name === adminRoleName
  );
  if (!adminRole) {
    return sendError(channel)(`A "${adminRoleName}" role is required`);
  }
  const isAdmin = member._roles.some((roleId) => roleId === adminRole.id);

  const [fullCommand, ...tokens] = content.split(" ");
  const cmd = fullCommand.slice(1);
  const action = actions.find(
    ({ command, shortcut }) => command === cmd || shortcut === cmd
  );

  if (!action) return sendUsage(channel);

  if (action.adminOnly && !isAdmin) {
    return sendError(channel)(
      `You need the "${adminRoleName}" role to do that!`
    );
  }

  if ("args" in action) {
    if (action.args.some((a) => a.startsWith("..."))) {
      if (tokens.length < action.args.length) {
        return sendError("Not enough arguments")(channel);
      }
    } else if (tokens.length !== action.args.length) {
      return sendError("Wrong number of arguments")(channel);
    }
  }

  new Promise((resolve, reject) => action.run(tokens, resolve, reject))
    .then((send = sendEntities) => {
      send(channel);
    })
    .catch((errorMessage) => sendError(errorMessage)(channel));
});

discordClient.login(process.env["BOT_TOKEN"]);
