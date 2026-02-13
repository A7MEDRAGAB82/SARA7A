import {hash,compare} from 'bcrypt'
import {env} from "../../../config/index.js"

export const generateHash = async (plainText) =>{
    const hashedPassword = await hash(plainText, +env.saltRounds || 10)
    return hashedPassword
}

export const compareHash = async (plainText,hashedText) => {
    const isMatched = await compare(plainText,hashedText)
    return isMatched
}