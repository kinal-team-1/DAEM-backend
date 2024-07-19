import { model, Schema } from "mongoose";

const ContributionSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  case_id: {
    type: Schema.Types.ObjectId,
    ref: "PublicCase",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  attachment: {
    type: Schema.Types.ObjectId,
    ref: "Attachment",
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  tp_status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export const Contribution = model("Contribution", ContributionSchema);
