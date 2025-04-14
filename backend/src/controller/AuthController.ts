
import { Request, Response } from 'express'
import User from "../model/User";
import { registerUser, loginUser, getUserId } from '../service/AuthService'

require('dotenv').config();
const SECRET_KEY = process.env.SECRET || "Secret";
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator';


export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password);
    res.cookie('token', user.token, {
      maxAge: 3600000,
      httpOnly: true,
      path: '/', 
      sameSite: 'lax',
    });
    res.status(200).json({
      message: "Uzytkownik zalogowany",
      token: user.token
    });


  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

export const register = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json('Email jest juz uzywany');
      return;
    }

    const newUser = registerUser(req.body);

    res.status(201).json('Uzytkownik zarejestrowany');
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

export const getName = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json('Brak tokenu');
    return;
  }

  try {
    const userId = await getUserId(token);
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json('Uzytkownik nie znaleziony');
      return;
    }
    console.log(user);
    res.status(200).json({
      name: user.firstName,
    });
  } catch (err) {
    res.status(400).json('Nieprawidlowy token');
  }
};
export const checkLogged = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  //console.log(token);
  if (!token) {
    res.status(401).json('False')
    return;
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { name: string };
    res.status(200).json("True");
  } catch (err) {
    res.status(400).json("False");
  }
}
export const logout = async (req: Request, res: Response) => {

  res.clearCookie('token');
  res.status(200).json('Wylogowano pomyślnie');
}
