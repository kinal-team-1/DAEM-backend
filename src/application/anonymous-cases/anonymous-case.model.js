import { model, Schema } from "mongoose";

const AnonymousCaseSchema = new Schema({
  // unique key identifier to follow up on the case
  key: {
    type: Schema.Types.ObjectId,
    ref: "AnonymousCase",
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

export const AnonymousCase = model("AnonymousCase", AnonymousCaseSchema);
