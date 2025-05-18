import Ad from "../model/Ads";
import Favorite from "../model/Favorites"
import { getUserId } from "./AuthService";

async function getAllUserFavorites(userId: string) {
    try {
        const favorite = await Favorite.find({ userWhoTakeItAsFavorite: userId })
        if (favorite.length < 0) {
            return { status: 404, message: "Not found" };
        }
        return { status: 200, message: favorite }
    }
    catch (error) {
        return { status: 400, message: error }
    }

}
async function postAllUserFavorites(userId: string, adId: string) {

    try {
         const existingFavorite = await Favorite.findOne({ 
            userWhoTakeItAsFavorite: userId,
            adId: adId
        });

        if (existingFavorite) {
            return { status: 409, message: "Ad already in favorites" };
        }
        const ad = await Ad.findById(adId)
        if (!ad) {
            return { status: 404, message: "Ad not found" };
        }
        console.log("user", userId)
        const favorite = new Favorite({
            userWhoTakeItAsFavorite: userId,
            title: ad.title,
            description: ad.description,
            note: ad.note,
            userId: ad.userId,
            images: ad.images,
            pet: ad.pet,
            age: ad.age,
            size: ad.size,
            voivodeship: ad.voivodeship,
            city: ad.city,
            number: ad.number,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            views: ad.views || 0,
            adId:ad._id
        })
        const res = await favorite.save();
        return { status: 201, message: res }
    } catch (error) {
        return { status: 400, message: error }
    }

}
async function deleteFromFavorites(favoriteId : string) {
    try{
        if(!favoriteId){
            return {status:400,message:"Invalid id"}
        }
        const deleted = await Favorite.findByIdAndDelete(favoriteId);
        if(deleted){
            return {status:200,message:"Deleted"}
        }
        else{
            const deleted2 = await Favorite.findOneAndDelete({adId:favoriteId})
            if(deleted2){
                            return {status:200,message:"Deleted"}

            }
            else{
            return {status:404,message:"Not found"}
            }
        }
    }catch(error){
        return {status:400, message:error}
    }
    
}
async function checkFavorite(favoriteId:string,token:string) {
    const userId = await getUserId(token);
    const isPresent = await Favorite.find({adId:favoriteId,userWhoTakeItAsFavorite:userId})
    console.log(isPresent)
    if(isPresent && isPresent.length >0){
        return {status:200,message:true}
    }
    else{
                return {status:200,message:false}

    }
}
export const FavoriteService = {
    getAllUserFavorites,
    postAllUserFavorites,
    deleteFromFavorites,
    checkFavorite
}