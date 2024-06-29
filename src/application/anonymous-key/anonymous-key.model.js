import { model, Schema } from "mongoose";

const AnonymousKeySchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export const AnonymousKey = model("AnonymousKey", AnonymousKeySchema);
