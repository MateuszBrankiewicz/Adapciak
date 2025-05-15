import { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../components/NavigationBar"
import { checkToken } from "../hooks/authHooks";
// Button is used in the JSX below
import Button from "../components/Button";
const MessagePage = () => {
    interface Message {
        _id: string;
        sender: {
            _id: string;
            firstName: string;
        };
        receiver: {
            _id: string;
            firstName: string;
        };
        content: string;
        adId:{
            _id: string;
            title: string;
        }
        read: boolean;
        createdAt: string;
        updatedAt: string;
    }
    const [messages, setMessages] = useState<Message[]>([]);
    const [conversation,setConversation] = useState<Message[]>([]);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const { data: authData, isError: authError } = checkToken();
    const [newMessage, setNewMessage] = useState<string>("");
    useEffect(() => {
        const fetchMessages = async () => {
            const response = await axios.get("http://localhost:3000/message", { withCredentials: true });
            setMessages(response.data as Message[]);
        };
        
        fetchMessages();
    }, [])
    const sendMessage = async () => {
        try {
            if (!newMessage.trim() || !conversation.length) {
                console.error("Message empty or conversation not loaded");
                return;
            }
            
            const receiverId = conversation[0].sender._id === authData?.data 
                ? conversation[0].receiver._id 
                : conversation[0].sender._id;
                
            const requestBody = {
                content: newMessage,
                adId: conversation[0].adId._id, 
                receiver: receiverId, 
            }
            
            await axios.post("http://localhost:3000/message", requestBody, { withCredentials: true });
            
            
            if (conversation[0].adId._id) {
                await fetchConversation(conversation[0].adId._id);
            }
            
            setNewMessage(""); // Clear the input field after sending
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }
    const fetchConversation = async (conversationId: string) => {
        try {
            const response = await axios.get(`http://localhost:3000/message/${conversationId}`, { withCredentials: true }) ;
            const message = response.data as Message[];
            setConversation(message);
            setConversationId(message[0]._id);
        } catch (error) {
            console.error("Error fetching conversation:", error);
        }
    };

    
    useEffect(() => {
        let intervalId: number;
        
        
        if (conversationId) {
            
            if (conversation[0]?.adId?._id) {
                fetchConversation(conversation[0].adId._id);
            }
            
           
            intervalId = window.setInterval(() => {
                if (conversation[0]?.adId?._id) {
                    fetchConversation(conversation[0].adId._id);
                }
            }, 10000); 
        }
        
        return () => {
            if (intervalId) {
                window.clearInterval(intervalId);
            }
        };
    }, [conversationId]);
    
    useEffect(() => {
        const fetchMessagesInterval = window.setInterval(() => {
            const fetchMessages = async () => {
                const response = await axios.get("http://localhost:3000/message", { withCredentials: true });
                setMessages(response.data as Message[]);
            };
            
            fetchMessages();
        }, 15000); 
        
       
        return () => {
            window.clearInterval(fetchMessagesInterval);
        };
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <NavigationBar/>
            <h1 className="px-4 py-2 text-2xl font-bold">Wiadomości</h1>
            <div className="flex flex-1 p-4 overflow-hidden">
                <div className="w-1/3 bg-white shadow-md rounded-lg p-4 mr-4 overflow-y-auto max-h-[calc(100vh-150px)]">
                    {messages.length > 0 ? messages.map((message) => (
                        <div 
                            onClick={() => fetchConversation(message.adId._id)} 
                            key={message._id} 
                            className={`border-b border-gray-200 py-3 px-2 mb-2 cursor-pointer hover:bg-gray-50 rounded ${message.read ? "bg-gray-100" : "bg-gray-300"}`}
                        >
                            <h2 className="text-gray-900 text-xl">{message.adId.title}</h2>
                            <p className="text-gray-600">{message.receiver.firstName}</p>
                            <p className="text-gray-400 text-sm">{new Date(message.createdAt).toLocaleString()}</p>
                        </div>
                    )) : (
                        <div className="text-center py-8 text-gray-500">
                            Brak wiadomości
                        </div>
                    )}
                </div>
                <div className="w-2/3 bg-white shadow-md rounded-lg p-4 flex-1 overflow-y-auto max-h-[calc(100vh-150px)]">
                    {conversationId ? (
                        <div className="h-full flex flex-col">
                            
                            <div className="flex-1">
                                    {conversation.map((message) => (
                                        <div 
                                            key={message._id} 
                                            className={`mb-4 p-3 rounded-lg max-w-[70%] ${message.sender._id === authData?.data ? 
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
                                            sendMessage();
                                        }
                                    }}
                                />
                                <Button size="small" type="button" onClick={sendMessage} text="Wyslij"/>
                                </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center">
                            <h2 className="text-gray-500 text-xl">Wybierz rozmowę</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    }
export default MessagePage;
