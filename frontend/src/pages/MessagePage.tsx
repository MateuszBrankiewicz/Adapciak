import { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../components/NavigationBar"
import { checkToken } from "../hooks/authHooks";
import {Message} from "../types/message.ts"
import MessageList from "../components/MessageList.tsx";
import Conversation from "../components/Conversation.tsx";
const MessagePage = () => {
    const [isConversationOpen, setIsConversationOpen] = useState(false);
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
            const response = await axios.get(`http://localhost:3000/message/${conversationId}`, { withCredentials: true });
            const message = response.data as Message[];
            
            if (message && message.length > 0) {
                setConversation(message);
                const lastMessageId = message[message.length-1]._id;
                setConversationId(lastMessageId);
                
               
            }
        } catch (error) {
            console.error("Error fetching conversation:", error);
        }
    };

    const setAsRead = async (messageId: string) => {
        try {
            await axios.put(`http://localhost:3000/message/read/${messageId}`, {}, { withCredentials: true });
            setMessages((prevMessages) => 
                prevMessages.map((message) => 
                    message.messageId === messageId ? { ...message, read: true } : message
                )
            );
        } catch (error) {
            console.error("Error setting message as read:", error);
        }
    }
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
            <div className="md:flex flex-1 p-4 overflow-hidden hidden">
                <div className="w-1/3 bg-white shadow-md rounded-lg p-4 mr-4 overflow-y-auto max-h-[calc(100vh-150px)]">
                 <MessageList messages={messages} fetchConversation={fetchConversation} setAsRead={setAsRead}/>
                </div>
                <div className="w-2/3 bg-white shadow-md rounded-lg p-4 flex-1 overflow-y-auto max-h-[calc(100vh-150px)]">
                   <Conversation conversation={conversation} userId={authData?.data as string} conversationId={conversationId} newMessage={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage}/>
                </div>
            </div>
            <div className="md:hidden flex-1 p-4 overflow-hidden flex">
              {!isConversationOpen ? ( 
                <div className="w-full bg-white shadow-md rounded-lg p-4 mr-4 overflow-y-auto max-h-[calc(100vh-150px)]" onClick={() => setIsConversationOpen(!isConversationOpen)}>
                 <MessageList messages={messages} fetchConversation={fetchConversation} setAsRead={setAsRead}/>
                </div>
              ):(
                
                <div className="w-full bg-white shadow-md rounded-lg p-4 flex-1 overflow-y-auto max-h-[calc(100vh-150px)]">
                  <span onClick={() => setIsConversationOpen(!isConversationOpen)} className="material-icons">arrow_back</span>
                   <Conversation conversation={conversation} userId={authData?.data as string} conversationId={conversationId} newMessage={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage}/>
                </div>
              )}
            </div>
        </div>
    );
    }
 export default MessagePage;