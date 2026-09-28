import { Router } from "express";
import { createProductValidator } from "../validators/product.validator.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { createProduct, listAllProducts } from "../controller/product.controller.js";
import multer from "multer"
import { unlistProductValidator } from "../validators/cart.validator.js";
import { unlistProduct } from "../controller/cart.controller.js";

const upload = multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize:1*1024*1024
    }
})

const router = Router()

router.post("/",authenticate,(req,res,next)=>{
    if(req.user.role!=="seller"){
        return res.status(403).json({
            message:"user is not authorized to create product"
        })
    }
    next()
},upload.array("images"),(req,res,next)=>{

        req.body?.price && (req.body.price = JSON.parse(req.body.price))
        req.body?.size && (req.body.sizes = JSON.parse(req.body.sizes))

        next()
},
createProductValidator, 
createProduct)

router.get("/",authenticate,listAllProducts)

router.patch("/unlist/:id",authenticate,(req,res,next)=>{
    if(req.user.role!=="seller"){
        return res.status(403).json({
            message:"only seller can unlist product"
        })
    }
},unlistProductValidator,unlistProduct)

export default router