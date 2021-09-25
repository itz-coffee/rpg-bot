import "reflect-metadata";
import path from "path";
import fs from "fs";
import { Intents, Interaction } from "discord.js";
import { Client } from "discordx";
import { token, guilds } from "./config.json";

export const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
  classes: [
    path.join(__dirname, "commands", "**/*.{ts,js}"),
    // path.join(__dirname, "events", "**/*.{ts,js}")
  ],
  botGuilds: guilds,
  silent: true,
});

client.on("ready", async () => {
  client.initApplicationCommands({ log: { forGuild: true, forGlobal: true } });

  const files = fs
    .readdirSync(__dirname + "/modules")
    .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

  for (const file of files) {
    console.log(`Loading ${file}`);
    const module = await import(`./modules/${file}`);
    module.default(client);
    console.log(`\t=> ${file} loaded!`);
  }
});

client.on("interactionCreate", (interaction: Interaction) => {
  if (interaction.isButton() || interaction.isSelectMenu()) {
    if (interaction.customId.startsWith("discordx@pagination@")) return;
  }

  client.executeInteraction(interaction);
});

client.login(token);