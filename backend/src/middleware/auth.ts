import { Response,Request,NextFunction } from "express";
import jwt,{Secret,JwtPayload} from 'jsonwebtoken'
import { CustomRequest } from "../service/AuthService";
import { SECRET_KEY } from "..";
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