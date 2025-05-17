export interface Message {
  _id: string; // ID grupy (adId)
  messageId: string; // Faktyczne ID wiadomości
  sender: {
    _id: string;
    firstName: string;
  };
  receiver: {
    _id: string;
    firstName: string;
  };
  content: string;
  adId: {
    _id: string;
    title: string;
  };
  read: boolean;
  createdAt: string;
  updatedAt: string;
}
