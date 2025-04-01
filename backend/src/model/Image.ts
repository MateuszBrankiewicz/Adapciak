import {Schema,Document} from "mongoose";
export interface IImage extends Document {
    url: string
}
const ImageSchema = new Schema<IImage> ({
    url: {type: String, unique:true} 
})
export default ImageSchema;