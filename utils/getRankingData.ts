import axiod from "axiod";
import { API_TOKEN_LEADERBOARD, AUTH_TOKEN, USER_ID } from "../env.ts";
import RankingData, { RankingDataRaw } from "../types/rankingData.type.ts";

/*
Entrar a https://d35aaqx5ub95lt.cloudfront.net/js/app-a9f9a02a.js
y buscar por "https://duolingo-leaderboards-prod.duolingo.com". La segunda variable tiene el valor.

También puedes entrar https://www.duolingo.com/leaderboard, y ver cuál URL se llama que tenga con leaderboards.
*/

export default async function getRankingData(): Promise<RankingData> {
  const { data } = await axiod.get<RankingDataRaw>(
    `https://duolingo-leaderboards-prod.duolingo.com/leaderboards/${API_TOKEN_LEADERBOARD}/users/${USER_ID}`,
    { headers: { authorization: `Bearer ${AUTH_TOKEN}` } }
  );

  return {
    score: data.active.score,
    contest: {
      ...data.active.contest,
      contest_end: new Date(data.active.contest.contest_end),
      constest_start: new Date(data.active.contest.constest_start),
      registration_end: new Date(data.active.contest.registration_end),
    },
    rankings: data.active.cohort.rankings,
    position: data.active.cohort.rankings.findIndex((r) => r.user_id === Number(USER_ID)) + 1,
  };
}
