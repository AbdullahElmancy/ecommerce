import CryptoJS from "crypto-js";
import ENV from "../config/env";
const secret = ENV.CRYPTO_KEY ?? "secret key 123";
export const encryptMobile = (mobile: string) => {
    return CryptoJS.AES.encrypt(mobile, secret).toString();
};

export const decryptMobile = (mobile: string) => {
    return CryptoJS.AES.decrypt(mobile, secret).toString(
        CryptoJS.enc.Utf8
    );
};