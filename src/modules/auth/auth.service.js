import { ProviderEnums } from "../../common/index.js";
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "../../common/utils/response/index.js";
import { userModel } from "../../database/index.js";
import { findOne, insertOne ,findById, findByIdAndDelete} from "../../database/index.js";
import jwt from "jsonwebtoken"
import { env } from "../../../config/index.js";
import crypto from "crypto"
import {sendEmail  , generateHash} from "../../common/index.js"


export const signUp = async (data) => {
  let { userName, email, password  , phone ,gender , DOB } = data;
  let existUser = await findOne({model:userModel ,filter:{email}})
  if (existUser) {
     ConflictException({message:"email already exist"});
  }
  let addedUser = await insertOne({
      model: userModel,
      data: { 
          userName, 
          email, 
          password,
          phone,
          gender,
          DOB, 
          provider: ProviderEnums.System 
      }
  });
  return addedUser;
};

export const login = async (data) => {
  let { email, password } = data;
  let existUser = await findOne({model:userModel , filter:{email , provider:ProviderEnums.System}})
  if (existUser) {
    const isMatched = await existUser.comparePassword(password)
    if(isMatched){
      let token = jwt.sign({id:existUser._id} , env.JWT_SECRET_KEY , {expiresIn:"1d"})
      return {user:existUser,token}
    }
  }
   NotFoundException({ message: "invalid email or password" });
};

export const getUserById = async (userId) =>{
 

   const  userData = await findById({model:userModel , id:userId}) 
   if(!userData){
     NotFoundException({message:"user not found"})
   }
   return userData
}

export const updateLoginData = async (id , data) =>{
  let {userName , phone, gender, DOB} = data
  const existUser = await findById({model:userModel , id})
  if(!existUser){
     NotFoundException({message:"user not found"})
  }
   
   
if (userName) existUser.userName = userName;
if (phone) existUser.phone = phone;
if (gender) existUser.gender = gender;
if (DOB) existUser.DOB = DOB;

  await existUser.save()


return existUser
  
}

export const deleteUser = async (id)=>{
    const deletedUser = await findByIdAndDelete({model:userModel , id})
    if(!deletedUser){
      NotFoundException({message:"user not found"})
    }
    return deletedUser
}

export const updatePassword = async (id , oldPassword , newPassword) =>{
  const existUser = await findById({model:userModel , id})
  if(!existUser){
      NotFoundException({message:"user not found"})
  }

  const isMatched = await existUser.comparePassword(oldPassword)
  if(!isMatched){
    UnauthorizedException({message:"old password is incorrect"})
  }
  existUser.password = newPassword
  await existUser.save()
  return existUser
}

export const forgotPassword = async (email) => {
    const user = await findOne({ model: userModel, filter: { email } });
    if (!user) {
        NotFoundException({ message: "User not found with this email" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    user.otp = await generateHash(otp);
    user.otpExpires = Date.now() + 10 * 60 * 1000; 

    await user.save();

    await sendEmail({
        to: email,
        subject: "Your OTP Code - Sara7a App",
        html: `<h2>Your OTP is: ${otp}</h2>
               <p>This code expires in 10 minutes.</p>`
    });

    return { message: "OTP sent to your email" };
};