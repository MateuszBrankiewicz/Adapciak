import mongoose, { Document, Model, Schema } from "mongoose";
import ImageSchema, { IImage } from "./Image";

export interface IFavorites extends Document {
    userWhoTakeItAsFavorite: mongoose.Types.ObjectId,
    title:string,
    description:string,
    note:string,
    userId: mongoose.Types.ObjectId;
    adId: mongoose.Types.ObjectId;
    images: IImage[];
    pet: string;
    age: string;
    size: string;
    voivodeship: string;
    city: string;
    number: string;
    createdAt: Date,
    updatedAt: Date,
    views : number
}
const FavoriteSchema = new Schema<IFavorites> ({
    userWhoTakeItAsFavorite: {type:Schema.Types.ObjectId, ref:"User", required: true},
    title: {type : String},
    description: {type:String},
    note: {type:String},
    userId: {type:Schema.Types.ObjectId, ref:"User", required: true},
    images: [ImageSchema],
    pet: {type: String, required: true},
    age: {type: String, required: true},
    size: {type: String, required: true},
    voivodeship: {type: String, required: true},
    city: {type: String, required: true},
    number: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type:Date, default: Date.now},
    views : {type: Number, default: 0},
    adId:{type:Schema.Types.ObjectId, ref:"Ads", required: true}
})
const Favorite : Model<IFavorites> = mongoose.model<IFavorites>("Favorite", FavoriteSchema)
export default Favorite;