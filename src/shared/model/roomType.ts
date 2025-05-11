import { Timestamp } from 'firebase/firestore';

export interface Message {
  id: string;
  message: string;
  messageId: string;
  messageName: string;
  createdAt: Timestamp;
  file?: File;
}

export interface LastMessageType
  extends Pick<Message, 'message' | 'messageName' | 'messageId'> {
  updatedAt: Timestamp;
}

export interface ChatRoom {
  roomId: string;
  userId: string;
  userName: string;
  vendorId: string;
  vendorName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastMessage: LastMessageType;
}
