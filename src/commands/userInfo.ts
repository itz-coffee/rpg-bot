import { ContextMenuInteraction, GuildMember, MessageEmbed } from "discord.js";
import { ContextMenu, Discord } from "discordx";
import { client } from "../client";

@Discord()
export default abstract class {
  @ContextMenu("USER", "User info", {
    description: "Gets some useful information about a user",
  })
  async function(interaction: ContextMenuInteraction) {
    const user = client.users.cache.get(interaction.targetId)!;
    const member = interaction.member as GuildMember;

    const embed = new MessageEmbed()
      .setColor(0xff0000)
      .setTitle("User info")
      .setImage(user.displayAvatarURL())
      .addFields(
        { name: "Name", value: `${user.username}#${user.discriminator}` },
        { name: "Joined Discord", value: `${user.createdAt}` },
        { name: "Joined Guild", value: `${member.joinedAt}` }
      );

    // interaction.reply({ embeds: [embed], ephemeral: true });
    interaction.reply({ embeds: [embed] });
  }
}
