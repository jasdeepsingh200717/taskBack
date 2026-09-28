import config from "../config/config.js";
import jwt from "jsonwebtoken"

export function createAccessToken({userdId,role}) {
    const accessToken = jwt.sign(
        {
            userdId,role},config.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})
            return accessToken
}

export function readAccessToken(accessToken){
    return jwt.verify(readAccessToken,config.ACCESS_TOKEN_SECRET)
}

export function createRefreshToken({userdId,role}) {
    const refreshToken = jwt.sign(
        {
            userdId,role},config.REFRESH_TOKEN_SECRET,{expiresIn:"7d"})
            return refreshToken
}

export function readRefreshToken(refreshToken){
    return jwt.verify(readRefreshToken,config.REFRESH_TOKEN_SECRET)
}