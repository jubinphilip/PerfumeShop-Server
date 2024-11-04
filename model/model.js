import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String}
})
export const userModel=mongoose.model('users',userSchema)

const perfumeSchema=new mongoose.Schema({
    name:{type:String},
    image:{type:String},
    price:{type:String}
})
export const perfumeModel=mongoose.model('perfumes',perfumeSchema)


const cartSchema=new mongoose.Schema({
    userid:{type:mongoose.Schema.ObjectId,ref:'users'},
    itemid:{type:mongoose.Schema.ObjectId,ref:'perfumes'},
    price:{type:String},
    count:{type:String}
})
export const cartModel=mongoose.model('cart',cartSchema)