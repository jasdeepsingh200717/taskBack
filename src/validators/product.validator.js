import {body,validationResult} from "express-validator"





export const createProductValidator = [
    body("title")
        .exists().withMessage("title is required").bail()
        .isString().withMessage("should be in string").bail()
        .trim()
        .isLength({min:2,max:100}).withMessage("title must be in between 2-100 char").bail()
        .isAlpha("en-US",{ignore:" "}).withMessage("title can only have small and uppercase char"),
    body("description")
        .exists().withMessage("description is required").bail()
        .isString().withMessage("should be in string").bail()
        .trim()
        .isLength({min:20,max:300}).withMessage("title must be in between 2-100 char").bail(),
    body("price.amount")
        .exists().withMessage("price amount is required").bail()
        .isFloat({min:0}).withMessage("price amount must be floating number"),
    body("price.currency")
        .exists().withMessage("price currency is required").bail()
        .isString().withMessage("currency must be in string")
        .isIn(["INR","USD"]).withMessage("only INR and USD currency are allowed"),
    body("sizes")
        .exists().withMessage("sizes are required").bail()
        .isArray().withMessage("sizes should be array of objects"),
    body("sizes.*.size")
        .exists().withMessage("this shoudl be mentioned").bail()
        .isString().withMessage("size must be in string").bail()
        .trim()
        .isIn(['XL','XXL','S','M','L']).withMessage("sizes can ve only the one mentioned"),
    body("sizes.*.stock")
        .exists().withMessage("stock must be present").bail()
        .isInt().withMessage("stock must in number"),
        (req,res,next)=>{
            const errors = validationResult(req)

            if(!errors.isEmpty){
                return res.status(401).json({
                    message:"error found",
                    errors: errors.array()
                })
            }
            next()
        }
]