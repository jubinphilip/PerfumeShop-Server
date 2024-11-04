import { userModel,cartModel,perfumeModel } from "../model/model.js";
import { main } from "../model/db.js";
import { createToken } from "../utils/createtoken.js";
import bcrypt from 'bcrypt'
import calCulateAmount from "../utils/calculate.js";
const saltRounds=10
main().catch((error)=>console.log(error))

export async function addUser(data, res) {
    try {
        const { name, email,password } = data;
        const record = await userModel.find({ email: email });
        
        if (record.length > 0) {
            console.log("Email already exists");
            return res.status(409).json({ message: "Email already exists" });
        } else {
            //hasing the passsword using bcrypt
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.log("Error hashing password");
                    return res.status(500).json({ message: "Error hashing password" });
                }
                try {
                    await userModel.create({
                        name,
                        email,
                        password: hash//inserting hashed password to db
                    });
                    return res.status(200).json({ message: "User registered successfully" });
                } catch (err) {
                    console.log("Error generated during registration", err);
                    return res.status(500).json({ message: "Error during registration" });
                }
            });
        }
    } catch (err) {
        console.log("Error in handleUser function", err);
        return res.status(500).json({ message: "Server error" });
    }
}

export const loginUser=async(req,res)=>{
    const{email,password}=req.body
    
    const data=await userModel.find({email:email})
    console.log("Data",data)
    const result= await bcrypt.compare(password,data[0].password)
    console.log(result)
    if(result)
    {
        const token=createToken(data)
        console.log("user login")
        res.json({status:1,message:"User Loginned",token:token,data:data[0]})
    }
    else
    {
        console.log("Login failed")
        res.json({status:0,message:"No user Found"})
    }
    console.log(email,password)
}

export const  getPerfumeData=async(req,res)=>
{
    try
    {
       const data= await perfumeModel.find()
       res.status(200).json(data)
    }
    catch(error)
    {
        console.log(error)
    }
}
export const addProduct=async(req,res)=>
{
    const{userid,itemid,count,price}=req.body
    console.log(price)
    try
    {
        await cartModel.create({    
            userid,
            itemid,
            count,
            price
        })
        res.status(200).json({message:"Data inserted"})
    }catch(error)
    {
        console.log("Error generated",error)
    }
}
export const  getOrders=async(req,res)=>
{
    const {id}=req.params
    try
    {
        const data=await cartModel.find({userid:id})
        .populate('itemid','name image price')

        const pricedetails=await calCulateAmount(data)

        res.status(200).json({data,pricedetails})
    }
    catch(error)
    {
        console.log(error)
    }
}

export const  deleteOrder=async(req,res)=>
{
    const {id}=req.params
    try
    {
    await cartModel.findByIdAndDelete(id);
    return { statusCode: 200, body: { message: "Item deleted successfully" } };
    }catch(error)
    {
        console.log("Error",error)
    }
}

export const manageOrder=async(req,res)=>
{
    const{id,op}=req.body
    console.log(id,op)
  const data= await cartModel.findById(id).populate('itemid','name image price')

  console.log("daattatatta",data)
    try
    {
        if(op=='+')
        {
          const count=Number(data.count)+1
          const price=Number(data.itemid.price)+Number(data.price)
        //  const amount=(data.amount)*count
        const updateCount=await cartModel.findOneAndUpdate(
            {_id:id},
            {$set:{count:count,price,price}}
        )
        res.status(200).json({message:"Success"})
    }
    else
    {

        if(data.count<=1)
        {
           // const amount=(data.amount)*count
            await cartModel.findByIdAndDelete(id);
        }
        const count=Number(data.count)-1
        const price=Number(data.price)-Number(data.itemid.price)
        const updateCount=await cartModel.findOneAndUpdate(
            {_id:id},
            {$set:{count:count,price,price}}
        )
        res.status(200).json({message:"Success"})
    }
    }catch(error)
    {
        console.log(error)
    } 
}