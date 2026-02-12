import { ConflictException } from "../../common/utils/response/error.responce.js"
import {userModel} from "../../database/index.js"


export const signUp = async (data) =>{
    let {userName , email  , password} = data
    let existUser = await userModel.findOne({email})
    if(existUser) {
        return ConflictException("email already exist")
    }
    let addedUser = await userModel.insertOne({userName , email , password})
    return addedUser
}