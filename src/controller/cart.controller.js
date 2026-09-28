import { model } from "mongoose";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export async function addToCart(req,res) {
    const {productId,quantity,size} = req.body;

    const product = await productModel.findById(productId)

    if(!product){
        return res.status(404).json({
            message:"product not found"
        })
    }

    const selectedSize = product.sizes.find(s => s.size === size)

    if(!selectedSize){
        return res.status(400).json({
            message:"size is incorrect"
        })
    }

    if(selectedSize.stock<quantity){
        res.status(400).json({
            message:"quantity is no more"
        })
    }

    let cart = await cartModel.findOne({user: req.user.userId})

    if(!cart){
        await cartModel.create({user: req.user.userId})
    }

    const productInCart = cart.products.find(p => (p.product.toString() === productId) && (p.size ===size))
    if(productInCart){
        if(productInCart.quantity + quantity > selectedSize.stock){
        res.status(400).product({
            message:"product finished"
        })
    }

    await cartModel.updateOne(
        {
            user: req.user.userId,
            "products.product":productId,
            "products.size":size,
        },
        {
            $inc:{
                "products.$.quantity" : quantity
            }
        }
    )
    return res.status(200).json({
        message:"product quantity upddated in cart "
    })
    }  

    await cartModel.findOneAndUpdate({
        user:req.user.userId
    },
    {
        $push:{
            products:{
                product:productId,
                quantity,
                size,
            }
        }
    }
)

}

export async function getCart(req,res) {
    const cart =  (await cartModel.findOne({user: req.user.userId})) ?? (await cartModel.create({user: req.user.userId}))

    return res.status(200).json({
        message:"cart created successfully",
        data:{
            cart,
        }
    })
}

export async function unlistProduct(req,res) {
    const {id}  = req.params
}