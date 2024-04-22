import { Bot } from "grammy/mod.ts";
import { run } from "grammy-runner";
import { BOT_TOKEN } from "../env.ts";
import messagesHandler from "./messagesHandler.ts";

const bot = new Bot(BOT_TOKEN);

export default bot;

bot.use(messagesHandler);

bot.catch(({ ctx, error }) => {
  console.error(`Error while handling update ${ctx.update.update_id}:`, error);
  ctx.reply("There was an error.");
});

run(bot);
