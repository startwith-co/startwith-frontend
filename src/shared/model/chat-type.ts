import { Timestamp } from 'firebase/firestore';

export interface FileItem {
  fileUniqueId: string;
  file: File;
  fileName: string;
}

export interface ChatFile extends Pick<FileItem, 'fileUniqueId' | 'fileName'> {}

export interface ChatJsonType {
  type: string;
  solutionName: string;
  solutionPrice: string;
  solutionCategory: string;
}

export interface ChatType {
  id: string;
  createdAt: Timestamp;
  role: 'consumer' | 'vendor' | 'system';
  messageId: string;
  messageName: string | ChatJsonType;
  message: string;
  file: ChatFile;
}
