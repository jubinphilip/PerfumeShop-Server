import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const createToken=(user)=>{
    console.log(user[0])
    const payload={
        id:user[0]._id,
        email:user[0].email,
    };
    const secret=process.env.JWT_SECRET;
    console.log(secret)
    const options={
        expiresIn:'1h'
    };
    return jwt.sign(payload,secret,options)
}