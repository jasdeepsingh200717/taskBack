import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createProduct(req,res) {
    console.log(req.body)
    console.log(req.files)

    const filesUrls = []

    for(let i=0;i<=req.files.length;i++){
        const res = await uploadFile({
            buffer:req.files[i].buffer,
            fileName:req.files[i].orignalname
        })
       

        filesUrls.push(res.url)
    }

    const product = await productModel.create({
        title:req.body.title,
        description:req.body.description,
        price:{
            amount: req.body.price.amount,
            currency: req.body.price.currency
        },
        sizes:req.body.sizes,
        image:filesUrls,
        seller:req.user.userId,
    })

    res.status(200).json({
        mrssage:"product created successfully"
    })
}

export async function listAllProducts(req,res) {
    const products = await productModel.findOne()

         
}