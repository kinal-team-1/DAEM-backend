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
  is_verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  attachments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Attachment",
      required: true,
      default: [],
    },
  ],
  updated_at: {
    type: Date,
  },

  tp_status: {
    type: Boolean,
    required: true,
    default: true,
  },

  location: {
    type: {
      address: String,
      city: String,
      country: String,
      location_point: {
        type: {
          type: String,
          enum: ["Point"],
          required: true,
          default: "Point",
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },
    },
    required: true,
  },
});

PublicCaseSchema.index({ "location.location_point": "2dsphere" });
export const PublicCase = model("PublicCase", PublicCaseSchema);
