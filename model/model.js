import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String}
},{timestamps:true})
export const userModel=mongoose.model('users',userSchema)

const perfumeSchema=new mongoose.Schema({
    name:{type:String},
    image:{type:String},
    price:{type:String},
    code:{type:String},
    offers:{type:Array}
})
export const perfumeModel=mongoose.model('perfumes',perfumeSchema)


const cartSchema=new mongoose.Schema({
    userid:{type:mongoose.Schema.ObjectId,ref:'users'},
    itemid:{type:mongoose.Schema.ObjectId,ref:'perfumes'},
    price:{type:String},
    count:{type:String}
},{timestamps:true})
export const cartModel=mongoose.model('cart',cartSchema)


const BookingSchema=new mongoose.Schema({
    userid:{type:mongoose.Schema.ObjectId,ref:'users'},
    amount:{type:String},
    perfumes:{type:Array}
})
export const BookingModel=mongoose.model('Bookings',BookingSchema)