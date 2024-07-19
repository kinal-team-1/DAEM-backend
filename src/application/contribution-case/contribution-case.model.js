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
  created_at: {
    type: Date,
    default: Date.now,
  },
  attachments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Attachment",
    },
  ],
});

export const Contribution = model("Contribution", ContributionSchema);
