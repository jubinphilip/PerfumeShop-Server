import jwt, { decode } from 'jsonwebtoken'
import dotenv from 'dotenv';


dotenv.config();
//Function for verifying token that is a middleware
 export const verifyToken = () => (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  console.log(token)
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  console.log(token)
  console.log( process.env.JWT_SECRET)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log(decoded)
    if (err) {
        console.log("error",err)
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    next();
  });
};
