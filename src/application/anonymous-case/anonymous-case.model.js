import { model, Schema } from "mongoose";

const AnonymousCaseSchema = new Schema({
  // unique key identifier to follow up on the case
  key: {
    type: Schema.Types.ObjectId,
    ref: "AnonymousKey",
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
    default: Date.now,
    required: true,
  },
  tp_status: {
    type: Boolean,
    default: true,
  },
  attachment: {
    type: Schema.Types.ObjectId,
    ref: "Attachment",
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

AnonymousCaseSchema.index({ "location.location_point": "2dsphere" });

export const AnonymousCase = model("AnonymousCase", AnonymousCaseSchema);
