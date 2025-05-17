import { useState } from "react";
import { Message } from "../types/message";
import Button from "./Button";

interface IConversation {
  conversation: Message[],
  conversationId: string | null;
  userId: string,
  sendMessage: (message: string) => void,
  newMessage: string,
  setNewMessage: (message: string) => void,
}

const Conversation = ({
  conversation,
  conversationId,
  userId,
  sendMessage,
  newMessage,
  setNewMessage
}: IConversation) => {
  
  const handleSendMessage = () => {
    sendMessage(newMessage);
  };

  return <div>
     {conversationId ? (
                        <div className="h-full flex flex-col">
                            
                            <div className="flex-1">
                                    {conversation.map((message) => (
                                        <div 
                                            key={message._id} 
                                            className={`mb-4 p-3 rounded-lg max-w-[70%] ${message.sender._id === userId? 
                                                "bg-blue-100 ml-auto rounded-tr-none" : 
                                                "bg-gray-100 mr-auto rounded-tl-none"}`}
                                        >
                                            <p className="text-gray-900">{message.content}</p>
                                            <p className="text-gray-400 text-sm">{new Date(message.createdAt).toLocaleString()}</p>
                                        </div>
                                    ))}
                                    </div>
                            <div className="flex items-center mt-4">
                                <input 
                                    type="text" 
                                    className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
                                    placeholder="Napisz wiadomość..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                />
                                <Button size="small" type="button" onClick={handleSendMessage} text="Wyslij"/>
                                </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center">
                            <h2 className="text-gray-500 text-xl">Wybierz rozmowę</h2>
                        </div>
                    )}
  </div>;
};

export default Conversation;
