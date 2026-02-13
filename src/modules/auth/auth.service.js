import { ProviderEnums } from "../../common/index.js";
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "../../common/utils/response/error.responce.js";
import { userModel } from "../../database/index.js";
import { findOne, insertOne ,findById} from "../../database/database.service.js";
import jwt from "jsonwebtoken"
import { env } from "../../../config/env.service.js";

export const signUp = async (data) => {
  let { userName, email, password } = data;
  let existUser = await findOne({model:userModel ,filter:{email}})
  if (existUser) {
    return ConflictException("email already exist");
  }
  let addedUser = await insertOne({
      model: userModel,
      data: { 
          userName, 
          email, 
          password, 
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
  return NotFoundException({ message: "invalid email or password" });
};

export const getUserById = async (headers) =>{
  let {authorization} = headers
  if (!authorization) {
      return   UnauthorizedException("Token required or invalid format");
    }
    
    let decoded = await jwt.verify(authorization , env.JWT_SECRET_KEY)

   let userData = await findById({model:userModel , id:decoded.id}) 
   if(!userData){
    return NotFoundException("user not found")
   }
   return userData
}
