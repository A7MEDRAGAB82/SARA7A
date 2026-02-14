import CryptoJS from "crypto-js";
import { env } from "../../../config/index.js";

export const encrypt = (text) => {
    return CryptoJS.AES.encrypt(text, env.cryptoSecret).toString();
};

export const decrypt = (cipherText) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, env.cryptoSecret);
    return bytes.toString(CryptoJS.enc.Utf8);
};