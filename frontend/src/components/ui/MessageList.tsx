import { Message } from "../../types/models/message.ts";
interface MessageList {
  messages: Message[],
  fetchConversation: (adId: string) => void,
  setAsRead: (messageId: string) => void,
}
const MessageList = ({messages, fetchConversation, setAsRead} : MessageList) => {
  return (
    <div>
      {messages.length > 0 ? (
        messages.map((message) => (
          <div
            onClick={() => {
              fetchConversation(message.adId._id);
              setAsRead(message.messageId);
            }}
            key={message.messageId}
            className={`border-b border-gray-200 py-3 px-2 mb-2 cursor-pointer hover:bg-gray-50 rounded ${message.read ? "bg-gray-100" : "bg-gray-300"}`}
          >
            <h2 className="text-gray-900 text-xl">{message.adId.title}</h2>
            <p className="text-gray-600">{message.receiver.firstName}</p>
            <p className="text-gray-400 text-sm">
              {new Date(message.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">Brak wiadomości</div>
      )}
    </div>
  );
};
export default MessageList;
