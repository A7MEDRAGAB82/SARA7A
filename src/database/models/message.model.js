import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Message content is required"],
      trim: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index:true
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index:true
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select:false
    },
  },
  {
    timestamps: true,
    versionKey: false
  },
);

export const messageModel = model("Message", messageSchema);
