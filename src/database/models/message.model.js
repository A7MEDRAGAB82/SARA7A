import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Message content is required"],
      trim: true,
      minLength: [1,"Message cannot be empty"],
      maxLength: [5000,"Message is too long"]
    },
    senderId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "User",
      index:true
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      required: [true,"receiverId is required"],
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
