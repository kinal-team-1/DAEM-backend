import { model, Schema } from "mongoose";

const StaleContentSchema = new Schema({
  filepath: { type: String, required: true, index: true, unique: true },
  createdAt: { type: Date, default: Date.now, index: true }, // Index added here
});

export const StaleContent = model("StaleContent", StaleContentSchema);
