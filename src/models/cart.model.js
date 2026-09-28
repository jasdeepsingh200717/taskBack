import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    product:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                required:true
                },
            quantity:{
                type:Number,
                default:1,
                min:1
            },
            size:{
                type:String,
                enum:['XL','L','M','S','XXL','XXXL'],  
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    }
})

const cartModel = mongoose.model("carts",cartSchema)

export default cartModel