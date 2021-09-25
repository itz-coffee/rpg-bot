import { CommandInteraction, MessageEmbed } from "discord.js";
import { Discord, MetadataStorage, Slash } from "discordx";
import { sendPaginatedEmbeds } from "@discordx/utilities";

@Discord()
export default abstract class {
  @Slash("help", { description: "Shows all the commands available" })
  async function(interaction: CommandInteraction) {
    const commands = MetadataStorage.instance.applicationCommands.map((cmd) => {
      return { name: cmd.name, description: cmd.description };
    });

    const pages = commands.map((cmd, i) => {
      return new MessageEmbed()
        .setFooter(`Page ${i + 1} of ${commands.length}`)
        .setTitle("**Command info**")
        .addField("Name", cmd.name)
        .addField("Description", cmd.description);
    });

    await sendPaginatedEmbeds(interaction, pages);
  }
}
