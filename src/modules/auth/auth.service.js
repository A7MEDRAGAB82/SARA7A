import { ProviderEnums } from "../../common/index.js";
import {
  ConflictException,
  NotFoundException,
} from "../../common/utils/response/error.responce.js";
import { userModel } from "../../database/index.js";
import { findOne } from "../../database/database.service.js";

export const signUp = async (data) => {
  let { userName, email, password } = data;
  let existUser = await findOne({model:userModel ,filter:{email}})
  if (existUser) {
    return ConflictException("email already exist");
  }
  let addedUser = await userModel.insertOne({ userName, email, password });
  return addedUser;
};

export const login = async (data) => {
  let { email, password } = data;
  let existUser = await findOne({model:userModel , filter:{email , password , provider:ProviderEnums.System} , select:"-password -_id"})
  if (existUser) {
    return existUser;
  }
  return NotFoundException({ message: "invalid email or password" });
};
