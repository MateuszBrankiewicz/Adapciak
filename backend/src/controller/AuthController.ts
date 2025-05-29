
import { Request, Response } from 'express'
import { 
  handleUserRegistration,
  handleUserLogin,
  getUserInfo,
  verifyUserToken,
 
} from '../service/AuthService'


export const login = async (req: Request, res: Response) => {
  try {
    const authResult = await handleUserLogin(req);
    
    res.cookie('token', authResult.token, {
      maxAge: 3600000,
      httpOnly: true,
      path: '/', 
      sameSite: 'lax',
    });
    
     res.status(200).json({
      message: authResult.message,
      token: authResult.token
    });
  } catch (err) {
    res.status(400).json((err as Error).message);
    return;
  }
};

export const register = async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    const message = await handleUserRegistration(req);
     res.status(201).json(message);
  } catch (err) {
    const errorMessage = (err as Error).message;
    
    if (errorMessage.includes('Błędy walidacji')) {
      res.status(401).json({ errors: JSON.parse(errorMessage.replace('Błędy walidacji: ', '')) });
      return;
    } else if (errorMessage.includes('Email jest juz uzywany')) {
      res.status(400).json(errorMessage);
      return;
    } else {
      res.status(400).json(errorMessage);
      return 
    }
  }
};

export const getName = async (req: Request, res: Response) => {
  try {
    const userInfo = await getUserInfo(req.cookies.token);
    res.status(200).json(userInfo);
    return;
  } catch (err) {
    const errorMessage = (err as Error).message;
    
    if (errorMessage === 'Brak tokenu') {
       res.status(401).json(errorMessage);
       return;
    } else if (errorMessage === 'Uzytkownik nie znaleziony') {
       res.status(404).json(errorMessage);
       return;
    } else {
      res.status(400).json('Nieprawidlowy token');
       return;
    }
  }
};
export const checkLogged = async (req: Request, res: Response) => {
  try {
    const userId = await verifyUserToken(req.cookies.token);
    res.status(200).json(userId);
    return;
  } catch (err) {
   res.status(401).json("False");
    return;
  }
}
export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json('Wylogowano pomyślnie');
  return;
}

