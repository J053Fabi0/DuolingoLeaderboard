import moment from "moment";
import { USER_ID } from "../env.ts";
import { escapeHtml } from "escapeHtml";
import { Composer } from "grammy/mod.ts";
import getRankingData from "../utils/getRankingData.ts";

const messagesHandler = new Composer();

interface Users {
  id: string;
  name: string;
  score: number;
  difference: number;
  online: boolean;
  position: string;
}

messagesHandler.on("message:text", async (ctx) => {
  let message = "";

  const rankingData = await getRankingData();

  message += `Estás en el puesto #${rankingData.position}\n`;

  const users: Users[] = rankingData.rankings.map((user, i) => ({
    score: user.score,
    name: user.display_name.length > 10 ? user.display_name.slice(0, 10) : user.display_name,
    id: user.user_id.toString(),
    difference: Math.abs(user.score - rankingData.score),
    online: user.has_recent_activity_15,
    position: (i + 1).toString().padEnd(2),
  }));

  const longestName = users.reduce((acc, user) => (user.name.length > acc ? user.name.length : acc), 0);

  for (const user of users)
    if (user.id === USER_ID) {
      message += `\n${user.position} ⭐️ ${"Tú".padEnd(longestName)} - ${user.score}`;
    } else {
      message +=
        `\n${user.position} ${user.online ? "🟢" : "🔴"} ${user.name.padEnd(longestName)}` +
        ` - ${user.score} - ${user.difference}`;
    }

  // How much time left for the contest to end
  const duration = moment.duration(moment(rankingData.contest.contest_end).diff());
  const durationData = [];
  const days = duration.days();
  if (days) durationData.push("día".toQuantity(days));
  const hours = duration.hours();
  if (hours) durationData.push("hora".toQuantity(hours));
  const minutes = duration.minutes();
  if (minutes) durationData.push("minuto".toQuantity(minutes));
  message += `\n\nTiempo restante: ${durationData.join(", ")}.`;

  await ctx.reply(`<code>${escapeHtml(message)}</code>`, { parse_mode: "HTML" });
});

export default messagesHandler;
