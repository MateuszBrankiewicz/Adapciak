import Message, { IMessage } from "../model/Message";
async function fetchAllMessages(userId: string) {
    try {
        const messages = await Message.find({
            $or: [
                { sender: userId },
                { receiver: userId }
            ]
        }).populate("sender", "name").populate("receiver", "name").populate("adId", "title");
        
        if (!messages || messages.length === 0) {
            return { status: 404, data: { error: "Nie znaleziono wiadomości" } };
        }
        
        return { status: 200, data: messages };
    } catch (error) {
        return { status: 500, data: { error: "Nie udało się pobrać wiadomości" } };
    }
}
async function getMessage(conversationId: string) {
    try {
        const message = await Message.findById(conversationId)
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
            
        return { status: 201, data: populatedMessage };
    } catch (error) {
        console.log("error", error);
        return { status: 500, data: { error: "Nie udało się dodać wiadomości" } };
    }
}

async function deleteMessage(messageId:string){}
export const MessageService = {
    fetchAllMessages,
    getMessage,
    createMessage,
     deleteMessage
}
