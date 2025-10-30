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
  consumerName: string;
  vendorName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  consumerSeq: string;
  vendorSeq: string;
  solutionName: string;
  userImg: string;
}
