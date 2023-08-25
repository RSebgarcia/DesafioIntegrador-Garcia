import mongoose, { mongo } from "mongoose";

const cartsSchema = new mongoose.Schema(
    {
		id: Number,
		products: Array
	}
)

export const cartsModel = mongoose.model("carts", cartsSchema)
