import {body, validationResult} from "express-validator"

export const registerValidator = [
    body('email')
    .trim()
    .exists().withMessage("email does not exists").bail()
    .isEmail().withMessage("enter valid email"),
    body('name')
    .exists().withMessage("name is required").bail()
    .isString().withMessage("name should be string")
    .trim()
    .isLength({min:2,max:35}).withMessage("name should be  more than 2 and under 50 char"),
    body('password')
    .exists().withMessage("password is required").bail()
    .isString().withMessage("password should be string")
    .trim()
    .isLength({min:8}).withMessage("name should be  more than 8 char"),
    (req,res,next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"invalid request",
                errors :  errors.array()
            })
        }
        next()
    }
]

export const loginValidator = [
    body('email')
    .trim()
    .exists().withMessage("email does not exists").bail()
    .isEmail().withMessage("enter valid email"),
    body('password')
    .exists().withMessage("password is required").bail()
    .isString().withMessage("password should be string")
    .trim()
    .isLength({min:8}).withMessage("name should be  more than 8 char"),
    (req,res,next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"invalid request",
                errors :  errors.array()
            })
        }
        next()
    }
]