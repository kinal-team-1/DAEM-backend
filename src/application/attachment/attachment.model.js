import { model, Schema } from "mongoose";

const [ANONYMOUS, PUBLIC, CONTRIBUTION] = [
  "anonymous",
  "public",
  "contribution",
];

const [IMG, VID, AUDIO, DOC] = ["img", "vid", "audio", "doc"];

const AttachmentSchema = new Schema({
  case_type: {
    type: String,
    required: true,
    enum: [ANONYMOUS, PUBLIC, CONTRIBUTION],
  },
  anonymous_case_id: {
    type: Schema.Types.ObjectId,
    ref: "AnonymousCase",
  },
  public_case_id: {
    type: Schema.Types.ObjectId,
    ref: "PublicCase",
  },
  contribution_id: {
    type: Schema.Types.ObjectId,
    ref: "Contribution",
  },
  file: {
    type: String,
    required: true,
  },
  file_type: {
    type: String,
    required: true,
    enum: [IMG, VID, AUDIO, DOC],
  },
  uploaded_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// constraints

// if anonymous_case_id exists, then case_type must be anonymous
// and public_case_id and contribution_id must not exist
AttachmentSchema.index(
  { anonymous_case_id: 1 },
  {
    partialFilterExpression: {
      case_type: ANONYMOUS,
      public_case_id: { $exists: false },
      contribution_id: { $exists: false },
    },
  },
);

// if public_case_id exists, then case_type must be public
// and anonymous_case_id and contribution_id must not exist
AttachmentSchema.index(
  { public_case_id: 1 },
  {
    partialFilterExpression: {
      case_type: PUBLIC,
      anonymous_case_id: { $exists: false },
      contribution_id: { $exists: false },
    },
  },
);

// if contribution_id exists, then case_type must be contribution
// and anonymous_case_id and public_case_id must not exist
AttachmentSchema.index(
  { contribution_id: 1 },
  {
    partialFilterExpression: {
      case_type: CONTRIBUTION,
      anonymous_case_id: { $exists: false },
      public_case_id: { $exists: false },
    },
  },
);

AttachmentSchema.statics.getCaseTypes = () => {
  return [ANONYMOUS, PUBLIC, CONTRIBUTION];
};

AttachmentSchema.statics.CASE_TYPE = () => ({
  ANONYMOUS,
  PUBLIC,
  CONTRIBUTION,
});

AttachmentSchema.statics.getFileTypes = () => {
  return [IMG, VID, AUDIO, DOC];
};

AttachmentSchema.statics.FILE_TYPE = () => ({
  IMG,
  VID,
  AUDIO,
  DOC,
});

export const Attachment = model("Attachment", AttachmentSchema);
