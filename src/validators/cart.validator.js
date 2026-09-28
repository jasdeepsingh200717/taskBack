import {body,param,validationResult} from "express-validator"

export const addToCartValidator = [
    body("productId")
        .exists().withMessage("productId is required").bail()
        .isString().withMessage("it should be string").bail()
        .isMongoId().withMessage("product should have valid mongoId"),
    body("quantity")
        .exists().withMessage("quantity is necessary").bail()
        .isInt({min:1}).withMessage("qty must be an int"),
    body("size")
        .exists().withMessage("size must be mentioned").bail()
        .isString().withMessage("size must a string").bail()
        .isIn(['XL','L','M','S','XXL','XXXL']).withMessage("please choose the size which is mentioned in list"),
    (req,res,next) =>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.status(401).json({
                message:"error found",
                errors: errors.array()
            })
            
        }
        next()
    }
]

export const unlistProductValidator = [
    param("id")
        .exists().withMessage("id is required").bail()
        .isMongoId().withMessage("product must have a valid mongoid"),

        (req,res,next) => {
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(400).json({
                    message:"error found",
                    errors: errors.array()
                })
            }
            next()
        }
]