import { readAccessToken } from "../utils/auth.util.js";

export function authenticate(req,res,next){
    const accessToken = req.headers.Authorization?.split(" ")[1]

    if(!accessToken){
        return res.status(401).json({
            message:"accesstoken not found"
        })
    }
    try {
        const decode = readAccessToken(accessToken)

        req.user = accessToken

        next()
    } catch (error) {
        res.status(401).json({
            message:"expired accessToken maybe"
        })
    }
}