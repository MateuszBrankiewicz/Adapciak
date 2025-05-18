import { Request,Response } from "express";
import { FavoriteService } from "../service/FavoriteService";
export async function getFavorites(req:Request, res:Response) {
    const {id} = req.params
    
    const response = await FavoriteService.getAllUserFavorites(id);
    res.status(response.status).json(response.message);
}
export async function postFavorites(req:Request, res:Response){
    const {userId, ad} = req.body
    const response = await FavoriteService.postAllUserFavorites(userId, ad);
    res.status(response.status).json(response.message);
}
export async function deleteFavorites(req:Request, res: Response) {
    const {id} = req.params;
    const response = await FavoriteService.deleteFromFavorites(id);
    res.status(response.status).json(response.message);
}
export async function checkFavorite(req:Request,res:Response){
    const {id} = req.params;
    const {token} = req.cookies;
    const response = await FavoriteService.checkFavorite(id,token);
    res.status(response.status).json(response.message);
}