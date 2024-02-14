export type CSVRow = {
  rank: number;
  score: number;
  competitorId: string;
  url: string;
};

export type LogRow = {
  timestamp: string;
  competitorId: string;
  score: number;
  url: string;
};
