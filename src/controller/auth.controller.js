import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { createAccessToken,createRefreshToken, readRefreshToken } from "../utils/auth.util.js";


export async function register(req,res) {
    const {email,name,password} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        email
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"user already exists",
            errors:[
                {
                    field:"email",
                    message:"user already exists"
                }
            ]
        })
    }

    const user = await userModel.create({
        email,
        name,
        passwordHash:await bcrypt.hash(password,12)
    })

    const accessToken = createAccessToken({
        userdId:user._id,
        role:user.role
    })

    const refreshToken = createRefreshToken({
        userdId: user._id,
        role: user.role
    })

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true
    })

    await userModel.findByIdAndUpdate(user._id,{
        refreshToken
    })
    res.status(201).json({
        message:"user registered successfully",
        data:{
            user:{
                email: user.email,
                name:user.name,
                id:user._id,

            },
            accessToken
        }
    })
}

export async function login(req,res) {
    const{email,password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"invalid credentials"
        })
    }

    const isPassword = await bcrypt.compare(password,user.passwordHash)

    if(!isPassword){
        return res.status(400).json({
            message:"invalid credentials"
        })
    }

    const accessToken = createAccessToken({
        userdId:user._id,
        role:user.role
    })

    const refreshToken = createRefreshToken({
        userdId: user._id,
        role: user.role
    })

    await userModel.findOneAndUpdate({email},{refreshToken})

    res.cookie("refreshToken",refreshToken,{httpOnly:true})

    res.status(201).json({
        message:"user registered successfully",
        data:{
            user:{
                email: user.email,
                name:user.name,
                id:user._id,

            },
            accessToken
        }
    })  
}

export async function refresh(req,res) {
    const refreshToken = req.cookies.refreshToken

    if(!refreshToken){
        return res.status(401).json({
            message:"refresh token is required"
        })
    }

    try {
        const decoded = readRefreshToken(refreshToken)

        const {userId,role}= decoded

        const user = await userModel.findById(userId)

        if(refreshToken != user.refreshToken){
            await userModel.findOneAndUpdate(user._id,{
                refreshToken:null
            })


        }

        const accessToken = createAccessToken({
            userId,
            role
        })

        const newRefreshToken = createRefreshToken({userId,role})

        await userModel.findByIdAndUpdate(user._id,{
            refreshToken:newRefreshToken
        })
        res.cookie("refreshToken",refreshToken,{httpOnly:true})

        res.status(200).json({
            message:"token created successfully",
            data:{
                user:{
                    email:user.email,
                    name:user.name,
                    id:user._id
                },
                accessToken 
            }
        })

    } catch (error) {
        return res.status(401).json({
            message:"invalid refresh token"
        })
    }
}

export async function getMe(req,res) {
    const {userId,role} = req.body

    const user = await userModel.findById(userId)

    res.status(201).json({
        message:"user data fetched successfully",
        data:{
            user:{
                    email:user.email,
                    name:user.name,
                    id:user._id
            }
        }
    })
}