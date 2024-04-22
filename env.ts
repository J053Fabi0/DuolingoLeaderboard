import "dotenv";
export const BOT_TOKEN = Deno.env.get("BOT_TOKEN") as string;
export const AUTH_TOKEN = Deno.env.get("AUTH_TOKEN") as string;
export const API_TOKEN_LEADERBOARD = Deno.env.get("API_TOKEN_LEADERBOARD") as string;
export const USER_ID = Deno.env.get("USER_ID") as string;
