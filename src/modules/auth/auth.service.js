import { ProviderEnums } from "../../common/index.js";
import {
  ConflictException,
  NotFoundException,
} from "../../common/utils/response/error.responce.js";
import { userModel } from "../../database/index.js";
import { findOne, insertOne } from "../../database/database.service.js";

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
      return existUser
    }
  }
  return NotFoundException({ message: "invalid email or password" });
};


