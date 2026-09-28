import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { addToCartValidator,unlistProductValidator } from "../validators/cart.validator.js";
import { addToCart,unlistProduct } from "../controller/cart.controller.js";
import { listAllProducts } from "../controller/product.controller.js";


const router = Router()

router.post("/",authenticate,addToCartValidator,addToCart)



export default router