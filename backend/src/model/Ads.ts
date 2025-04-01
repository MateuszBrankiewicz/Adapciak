import mongoose, { Schema,Document,Model } from "mongoose";
import ImageSchema, { IImage } from "./Image";
export interface IAds extends Document {
    title:string,
    description:string,
    userId: mongoose.Types.ObjectId;
    images: IImage[];
    createdAt: Date,
    updatedAt: Date,
    views : number
}
const AdsSchema = new Schema<IAds> ({
    title: {type : String},
    description: {type:String},
    userId: {type:Schema.Types.ObjectId, ref:"User", required: true},
    images: [ImageSchema],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type:Date, default: Date.now},
    views : {type: Number, default: 0}
})
const Ad : Model<IAds> = mongoose.model<IAds>("Ad", AdsSchema)
export default Ad;