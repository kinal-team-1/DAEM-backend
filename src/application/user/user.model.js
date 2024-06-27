import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  tp_status: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.index(
  { email: 1, tp_status: 1 },
  { unique: true, partialFilterExpression: { tp_status: true } },
);

UserSchema.index(
  { username: 1, tp_status: 1 },
  { unique: true, partialFilterExpression: { tp_status: true } },
);

export const User = model("User", UserSchema);
