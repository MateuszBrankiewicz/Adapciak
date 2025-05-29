import User, { IUser } from "../model/User";
import {Document} from 'mongoose';
import jwt,{Secret,JwtPayload} from 'jsonwebtoken'
import {Request,Response,NextFunction} from 'express'
import { validationResult } from 'express-validator';

require('dotenv').config();
const SECRET_KEY = process.env.SECRET || "Secret";


export interface AuthResponse {
  message: string;
  token: string;
  user?: any;
}

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}
export const registerUser = async (user : Document<IUser>) => {
  try{
    const createUser = await User.create(user);
    return createUser;
  }catch(error){
  throw error;
}
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
    if (typeof decoded !== "object" || !decoded._id) {
      throw new Error("Invalid token");
    }
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      throw new Error("Token expired");
    }
    return decoded._id || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// Sprawdzanie czy użytkownik istnieje
export const checkUserExists = async (email: string): Promise<boolean> => {
  try {
    const existingUser = await User.findOne({ email });
    return !!existingUser;
  } catch (error) {
    throw error;
  }
}

// Pełna logika rejestracji z walidacją
export const handleUserRegistration = async (req: Request): Promise<string> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(`Błędy walidacji: ${JSON.stringify(errors.array())}`);
  }
  
  const { email } = req.body;
  
  const userExists = await checkUserExists(email);
  if (userExists) {
    throw new Error('Email jest juz uzywany');
  }
  
  await registerUser(req.body);
  return 'Uzytkownik zarejestrowany';
}

// Pełna logika logowania z walidacją
export const handleUserLogin = async (req: Request): Promise<AuthResponse> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(`Błędy walidacji: ${JSON.stringify(errors.array())}`);
  }
  
  const { email, password } = req.body;
  const userResult = await loginUser(email, password);
  
  return {
    message: "Uzytkownik zalogowany",
    token: userResult.token,
    user: userResult.user
  };
}

// Pobieranie informacji o użytkowniku
export const getUserInfo = async (token: string): Promise<{ name: string }> => {
  if (!token) {
    throw new Error('Brak tokenu');
  }
  
  const userId = await getUserId(token);
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('Uzytkownik nie znaleziony');
  }
  
  return {
    name: user.firstName
  };
}


// Sprawdzanie tokenu
export const verifyUserToken = async (token: string): Promise<string> => {
  if (!token) {
    throw new Error('Brak tokenu');
  }
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    return decoded._id;
  } catch (err) {
    throw new Error('Nieprawidłowy token');
  }
}