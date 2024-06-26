import { model, Schema } from "mongoose";

const PublicCaseSchema = new Schema({
  submitter: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  reported_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  is_verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  attachments: [
    {
      type: "Attachment",
      required: true,
      default: [],
    },
  ],
  updated_at: {
    type: Date,
    default: Date.now,
  },

  tp_status: {
    type: String,
    required: true,
    default: true,
  },
});

export const PublicCase = model("PublicCase", PublicCaseSchema);
