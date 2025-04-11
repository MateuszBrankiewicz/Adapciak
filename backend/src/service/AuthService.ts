import User, { IUser } from "../model/User";
import {Document} from 'mongoose';
import jwt,{Secret,JwtPayload} from 'jsonwebtoken'
import {Request,Response,NextFunction} from 'express'
require('dotenv').config();
const SECRET_KEY = process.env.SECRET || "Secret";
export const registerUser = async (user : Document<IUser>) => {
  try{
    await User.create(user);
  }catch(error){
  throw error;
}
}

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}
export const auth = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.cookies.token;

   if (!token) {
     throw new Error();
   }

   const decoded = jwt.verify(token, SECRET_KEY);
   (req as CustomRequest).token = decoded;

   next();
 } catch (err) {
   res.status(401).send('Please authenticate');
 }
};
export const loginUser = async (email:string,password:string) => {
  try{
   const foundUser = await User.findOne({email})
    if(!foundUser){
      throw new Error("Niepoprawny email");
    }
  if( !(await foundUser.comparePassword(password))){
      throw new Error("Niepoprawne haslo");
      
    }
    const token = jwt.sign({_id: foundUser._id?.toString(),name: foundUser.email}, SECRET_KEY,{
      expiresIn:'2 days',
    })
    return {user:foundUser, token: token};
  }catch(error){
      throw error;
    }
  
}
export const getUserId = async (token: string): Promise<string | null> => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    return decoded._id || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};