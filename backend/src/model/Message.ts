import mongoose, { Document } from "mongoose";

export interface IMessage extends Document {
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    adId: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    read: boolean;
}
const MessageSchema = new mongoose.Schema<IMessage> ({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    adId: { type: mongoose.Schema.Types.ObjectId, ref: "Ad", required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
})
const Message = mongoose.model<IMessage>("Message", MessageSchema);
export default Message;