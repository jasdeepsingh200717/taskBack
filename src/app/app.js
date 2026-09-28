import express from "express"
import router from "../routes/auth.route.js"
import cookieParser from "cookie-parser"
import productRoutes from "../routes/products.route.js"
import cartRoutes from "../routes/cart.route.js"

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",router)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)

export default app