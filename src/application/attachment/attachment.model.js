import { model, Schema } from "mongoose";

const AttachmentSchema = new Schema({
  filepaths: {
    type: [String],
    required: true,
  },
  uploaded_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  tp_status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export const Attachment = model("Attachment", AttachmentSchema);
