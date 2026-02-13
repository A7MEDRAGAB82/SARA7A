import mongoose from "mongoose";
import { GenderEnums, ProviderEnums } from "../../common/index.js";
import {env} from "../../../config/index.js"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
    trim:true
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
    trim:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase:true,
    trim:true
  },
  password: {
    type: String,
    required: true,
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
},{ timestamps: true,
    toJSON:{virtuals:true},
    toObject: {virtuals:true}
});


userSchema.virtual('userName').set(function (value){
    if(!value)return
    let split = value.split(' ')
    this.firstName = split[0]
    this.lastName = split.length > 1 ? split[1] : ""
}).get(function () {
    return `${this.firstName} ${this.lastName}`
})

userSchema.pre('save', async function () {
    
    if (!this.isModified('password')) return; 

    this.password = await bcrypt.hash(this.password, parseInt(env.saltRounds) || 10); 
});

export const userModel = mongoose.model("User", userSchema)
