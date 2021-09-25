import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
export default abstract class {
  @Slash("ping", { description: "Pong!" })
  async function(interaction: CommandInteraction) {
    const before = Date.now();

    await interaction.deferReply();

    const after = interaction.createdTimestamp;
    
    interaction.editReply(`Pong! Heartbeat: ${interaction.client.ws.ping}ms, API: ${before - after}ms`);
  }
}
