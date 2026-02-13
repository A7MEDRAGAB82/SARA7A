import mongoose from "mongoose";
import {
  GenderEnums,
  ProviderEnums,
  generateHash,
  compareHash,
} from "../../common/index.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === ProviderEnums.System;
      },
    },
    phone: String,
    DOB: Date,
    gender: {
      type: String,
      enum: Object.values(GenderEnums),
      default: GenderEnums.Male,
    },
    provider: {
      type: String,
      enum: Object.values(ProviderEnums),
      default: ProviderEnums.System,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
    toObject: { virtuals: true },
  },
);

userSchema
  .virtual("userName")
  .set(function (value) {
    if (!value) return;
    let split = value.split(" ");
    this.firstName = split[0];
    this.lastName = split.length > 1 ? split[1] : "";
  })
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  });

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await generateHash(this.password);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await compareHash(enteredPassword, this.password);
};

export const userModel = mongoose.model("User", userSchema);
