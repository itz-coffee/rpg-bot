import { CommandInteraction } from "discord.js";
import {
  DefaultPermission,
  Discord,
  Permission,
  Slash,
  SlashOption,
} from "discordx";
import { owner } from "../config.json";

@Discord()
@DefaultPermission(false)
@Permission({ id: owner, type: "USER", permission: true })
export default abstract class {
  @Slash("eval", { description: "Evaluates code" })
  async function(
    @SlashOption("code")
    code: string,
    interaction: CommandInteraction
  ) {
    await interaction.deferReply();

    let result = eval(code);

    if (result && result.constructor.name == "Promise") result = await result;
    if (typeof result !== "string")
      result = require("util").inspect(result, { depth: 1 });

    result = result
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));

    interaction.editReply("```ts\n" + result + "\n```");
  }
}
