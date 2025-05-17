import { Request, Response } from "express"
import { getUserId } from "../service/AuthService"
import { MessageService } from "../service/MessageService"
import { IMessage } from "../model/Message"

export const getAllMessages = async (req:Request, res:Response) => {
    const userId = await getUserId(req.cookies.token) ?? ''; 
    const result = await MessageService.fetchAllMessages(userId);
     res.status(result.status).json(result.data);
}
export const getMessage = async (req:Request, res:Response) => {
    const id = req.params.id;
    const result = await MessageService.getMessage(req.params.id);
     res.status(result.status).json(result.data);
}

export const createMessage = async (req:Request, res: Response) => {
    const { receiver, adId, content } = req.body;
    const userId = await getUserId(req.cookies.token) ?? '';
    
    
    if (!receiver || !adId || !content) {
        res.status(400).json({ error: "Brakuje wymaganych pól" });
        return;
    }
    
    const result = await MessageService.createMessage({
        sender: userId,
        receiver,
        adId,
        content
    } as any, userId);
     
    res.status(result.status).json(result.data);
}
export const setReaded = async (req:Request, res:Response) => {
    const messageId = req.params.id;
    const result = await MessageService.setReaded(messageId);
    res.status(result.status).json(result.data);
}
export const deleteMessage = async (req:Request, res:Response) => {}    