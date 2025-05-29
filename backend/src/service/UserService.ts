import { error } from "console";
import { getUserId } from "./AuthService"
import User from "../model/User";
import { Request,Response } from "express";
import { validationResult } from "express-validator";
const handleChangePassowrd = async (newPassword: string, token:string) =>{
    try{
        const id = await getUserId(token);
       
        const user = await  User.findById(id);
         if (!user){
            return {status:404, message:"Nie znaleziono uzytkownika"}
        }
        user.password = newPassword;
        const result = await User.findByIdAndUpdate(id,user);
        return {status:200, message:"Zmieniono hasło"}

    }
    catch(error){
        return{status:500, message: "Server error"}
    }
}
// Pobieranie pełnego profilu użytkownika

 const getUserProfile = async (token: string): Promise<{ status: number; message: any }> => {
  try {
    if (!token) {
      return { status: 401, message: 'Brak tokenu' };
    }
    
    const userId = await getUserId(token);
    if (!userId) {
      return { status: 401, message: 'Nieprawidłowy token' };
    }
    
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return { status: 404, message: 'Użytkownik nie znaleziony' };
    }
    
    return {
      status: 200,
      message: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        voivodeship: user.voivodeship,
        city: user.city
      }
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { status: 500, message: 'Błąd serwera' };
  }
}

// Aktualizacja profilu użytkownika (bez hasła)

 const updateUserProfile = async (req: Request): Promise<{ status: number; message: any }> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return { status: 400, message: { errors: errors.array() } };
    }

    const userId = await getUserId(req.cookies.token);
    if (!userId) {
      return { status: 401, message: 'Nie jesteś zalogowany' };
    }

    const { firstName, lastName, phone, voivodeship, city } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        phone,
        voivodeship,
        city
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return { status: 404, message: 'Użytkownik nie znaleziony' };
    }

    return { status: 200, message: 'Profil został zaktualizowany pomyślnie' };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { status: 500, message: 'Nie udało się zaktualizować profilu' };
  }
}

// Zmiana hasła

 const changeUserPassword = async (req: Request): Promise<{ status: number; message: any }> => {
  try {
    const userId = await getUserId(req.cookies.token);
    if (!userId) {
      return { status: 401, message: 'Nie jesteś zalogowany' };
    }

    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return { status: 404, message: 'Użytkownik nie znaleziony' };
    }

    // Sprawdzenie aktualnego hasła
    const isCurrentPasswordCorrect = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordCorrect) {
      return { status: 400, message: 'Aktualne hasło jest niepoprawne' };
    }

    // Aktualizacja hasła (zostanie zahashowane automatycznie przez pre-save hook)
    user.password = newPassword;
    await user.save();

    return { status: 200, message: 'Hasło zostało zmienione pomyślnie' };
  } catch (error) {
    console.error('Error changing password:', error);
    return { status: 500, message: 'Nie udało się zmienić hasła' };
  }
}


 export const UserService = {
    handleChangePassowrd,
    updateUserProfile,
    changeUserPassword,
    getUserProfile
}