import { StringWithSuggestions } from "grammy/context.ts";

export default interface RankingData {
  score: number;
  position: number;
  rankings: Ranking[];
  contest: {
    contest_end: Date;
    contest_id: string;
    constest_start: Date;
    contest_state: StringWithSuggestions<"ACTIVE">;
    registration_end: Date;
    registration_state: StringWithSuggestions<"CLOSED">;
  };
}

export interface RankingDataRaw {
  active: {
    cohort: {
      cohort_info: {
        client: string;
        quintile: string; // Int number
      };
      creation_date: string; // new Date() compatible
      rankings: Ranking[];
      tier: number;
    };
    contest: {
      contest_end: string; // new Date() compatible
      contest_id: string;
      constest_start: string; // new Date() compatible
      contest_state: StringWithSuggestions<"ACTIVE">;
      registration_end: string; // new Date() compatible
      registration_state: StringWithSuggestions<"CLOSED">;
    };
    score: number;
    user_id: number;
  };
}

export interface Ranking {
  score: number;
  user_id: number;
  display_name: string;
  has_recent_activity_15: boolean;
}
