import nodeCron from "node-cron";
import { StaleContent } from "./src/application/stale-content/stale-content.model.js";
import { logger } from "./src/utils/logger.js";
import { supabaseClient } from "./src/utils/supabase-client.js";

export const removeStaleContent = nodeCron.schedule(
  "*/15 * * * * *",
  // eslint-disable-next-line func-names
  async function removeStaleContentEvery15Min() {
    try {
      logger.task_schedule("Starting to remove stale content every 15 minutes");
      const currentDate = new Date();
      const oneHourAgo = new Date(currentDate.getTime() - 60 * 60 * 1000);

      const deletedRecords = [
        ...(await StaleContent.find({
          createdAt: { $lt: oneHourAgo },
        })),
      ];

      if (deletedRecords.length === 0) {
        logger.task_schedule(deletedRecords, "No stale content to remove");
        return;
      }

      logger.task_schedule(
        deletedRecords,
        "Removing stale content from the bucket",
      );

      await supabaseClient.remove(
        deletedRecords.map((record) => record.filepath),
      );

      logger.task_schedule(
        deletedRecords,
        "Removing stale content from the database",
      );
      await StaleContent.deleteMany({
        createdAt: { $lt: oneHourAgo },
      });

      logger.task_schedule(deletedRecords, "Finished removing stale content");
    } catch (error) {
      logger.task_schedule(error, "Error removing stale content");
    }
  },
);
