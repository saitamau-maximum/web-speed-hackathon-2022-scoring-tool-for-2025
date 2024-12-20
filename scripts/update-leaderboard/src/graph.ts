import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import fs from "fs/promises";
import path from "path";
import { parse as parseCSV } from "csv-parse/sync";
import { LogRow } from "./types";
import { findRoot } from "./utils";
import "chartjs-adapter-moment";
import randomColor from "randomcolor";

export async function generateGraphFromLog() {
  const LOG_CSV_PATH = path.join(await findRoot(), "log.csv");
  const scoreList = parseCSV(await fs.readFile(LOG_CSV_PATH, "utf-8"), {
    columns: true,
    cast: (value, context) => {
      if (context.header) {
        return value;
      }
      if (["score"].includes(context.column as string)) {
        return Number(value);
      }
      return String(value);
    },
  }) as LogRow[];

  const sortedByDateScoreList = scoreList.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const PER_STEP = 1000 * 60 * 60; // 1 hour
  const labels = [];
  const START_DATE = new Date("2024-12-19T00:00:00.000+09:00");
  const CURRENT_DATE = new Date(
    sortedByDateScoreList[sortedByDateScoreList.length - 1].timestamp
  );
  for (
    let date = START_DATE;
    date <= CURRENT_DATE;
    date = new Date(date.getTime() + PER_STEP)
  ) {
    labels.push(date.toISOString());
  }

  // generate data
  const competitors = new Set(
    sortedByDateScoreList.map((log) => log.competitorId)
  );
  const competitorDataMap = new Map<string, number[]>();
  for (const competitor of competitors) {
    const data = [];
    const competitorLogs = sortedByDateScoreList.filter(
      (log) => log.competitorId === competitor
    );
    let lastScore = 0;
    for (const label of labels) {
      const log = competitorLogs.find(
        (log) =>
          new Date(log.timestamp).getTime() >
            new Date(label).getTime() - PER_STEP &&
          new Date(log.timestamp).getTime() <= new Date(label).getTime()
      );
      if (log) {
        lastScore = log.score;
      }
      data.push(lastScore);
    }
    competitorDataMap.set(competitor, data);
  }

  // chart
  const chart = new ChartJSNodeCanvas({
    width: 800,
    height: 400,
    backgroundColour: "white",
  });

  const config = {
    type: "line" as const,
    data: {
      labels,
      datasets: Array.from(competitorDataMap).map(([competitor, data]) => {
        const hash = require("crypto")
          .createHash("md5")
          .update(competitor)
          .digest("hex");
        const color = randomColor({ luminosity: "bright", seed: hash });
        return {
          label: competitor,
          data,
          fill: false,
          borderColor: color,
        };
      }),
    },
    options: {
      scales: {
        x: {
          type: "time" as const,
          time: {
            unit: "hour" as const,
          },
        },
      },
    },
  };
  const image = await chart.renderToBuffer(config);
  return image;
}
