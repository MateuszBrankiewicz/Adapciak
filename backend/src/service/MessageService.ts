import Message, { IMessage } from "../model/Message";
import mongoose, { set } from "mongoose";

async function fetchAllMessages(userId: string) {
    try {
        const message = await Message.find();
        const messages = await Message.aggregate([
            {
            $match: {
                $or: [
                { sender: new mongoose.Types.ObjectId(userId) },
                { receiver: new mongoose.Types.ObjectId(userId) }
                ]
            }
            },
            {
            $sort: { createdAt: -1 }
            },
            {
            $group: {
                _id: "$adId",
                messageId: { $first: "$_id" },
                sender: { $first: "$sender" },
                receiver: { $first: "$receiver" },
                adId: { $first: "$adId" },
                content: { $first: "$content" },
                createdAt: { $first: "$createdAt" },
                updatedAt: { $first: "$updatedAt" },
                read: { $first: "$read" }
            }
            }
        ]);
        await Message.populate(messages, [
            {path:"sender", select: "firstName"},
            {path:"receiver", select: "firstName"},
            {path:"adId", select: "title"}
        ]);
        if (!messages || messages.length === 0) {
            return { status: 404, data: { error: "Nie znaleziono wiadomości" } };
        }
        
        return { status: 200, data: messages };
    } catch (error) {
        console.log("Error fetching messages:", error);
        return { status: 500, data: { error: "Nie udało się pobrać wiadomości" } };
    }
}
async function getMessage(conversationId: string) {
    try {
        const message = await Message.find({"adId": conversationId})
            .populate("sender", "name")
            .populate("receiver", "name")
            .populate("adId", "title");
        if (!message) {
            return { status: 404, data: { error: "Nie znaleziono wiadomości" } };
        }
        return { status: 200, data: message };
    } catch (error) {
        console.log("error", error);
        return { status: 500, data: { error: "Nie udało się pobrać wiadomości" } };
    }
}
async function createMessage(message:IMessage, userId: string) {
    try {
        const newMessage = new Message({
            sender: userId,
            receiver: message.receiver,
            adId: message.adId,
            content: message.content,
            createdAt: new Date(),
            updatedAt: new Date(),
            read: false
        });
        
        const savedMessage = await newMessage.save();
        const populatedMessage = await Message.findById(savedMessage._id)
            .populate("sender", "name")
            .populate("receiver", "name")
            .populate("adId", "title");
            
        return { status: 201, message:"Wiadomosc wyslana" };
    } catch (error) {
        console.log("error", error);
        return { status: 500, data: { error: "Nie udało się dodać wiadomości" } };
    }
}
async function setReaded(messageId:string) {
    try {
        const message = await Message.updateOne(
            { _id: new mongoose.Types.ObjectId(messageId) },
            { $set: { read: true } }
        );
        const tryToFindMessage = await Message.findById(messageId);
        
        // Sprawdzamy czy dokument w ogóle istnieje
        if (message.matchedCount === 0 || !tryToFindMessage) {
            return { status: 404, data: { error: "Nie znaleziono wiadomości" } };
        }
        
        // Dokument istnieje, ale możliwe że pole read już było ustawione na true
        return { status: 200, data: { message: "Wiadomość oznaczona jako przeczytana" } };
    } catch (error) {
        console.log("error", error);
        return { status: 500, data: { error: "Nie udało się oznaczyć wiadomości jako przeczytanej" } };
    }
}
async function deleteMessage(messageId:string){}
export const MessageService = {
    fetchAllMessages,
    getMessage,
    createMessage,
    deleteMessage,
    setReaded
}
