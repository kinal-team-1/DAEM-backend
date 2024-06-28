import { pino } from "pino";
import pinoCaller from "pino-caller";
import path from "node:path";
import { existsSync } from "node:fs";

function findProjectRoot(currentDir) {
  if (existsSync(path.join(currentDir, "package.json"))) {
    return currentDir;
  }

  const parentDir = path.resolve(currentDir, "..");

  if (parentDir === currentDir) {
    throw new Error("Project root not found");
  }

  return findProjectRoot(parentDir);
}

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV !== "production";
const isTest = process.env.NODE_ENV === "test";
const isDebug = process.env.DEBUG === "true";

const transport = {
  target: "pino-pretty",
  options: {
    customLevels: "request_info:35", // split by ','
    customColors: "request_info:magenta", // split by ','
    useOnlyCustomProps: false,
  },
};

const defaultLogger = pino({
  customLevels: {
    // color: 'indigo',
    request_info: 35,
  },

  // if isTest then only show errors
  ...(isTest && !isDebug ? { level: "fatal" } : undefined),

  transport: isDevelopment ? transport : undefined,
});

// @ts-ignore
const developmentLogger = pinoCaller(defaultLogger, {
  relativeTo: `file:///${findProjectRoot(import.meta.url).replaceAll("\\", "/")}`,
});

export const logger = isProduction ? defaultLogger : developmentLogger;
