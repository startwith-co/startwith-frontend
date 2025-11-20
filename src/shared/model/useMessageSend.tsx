'use client';

import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import createRoom from '@/shared/api/create-room';
import { v4 as uuidv4 } from 'uuid';
import findChatExistingRoom from '@/shared/api/find-chat-existing-room';
import getMessagesById from '@/shared/api/get-messages-by-id';
import db from 'fire-config';
import { ChatType } from '@/shared/model/chat-type';
import { useChatMeta } from './ChatMetaProvider';
import ChatFilePost from '../api/chat-file-post';
import useChatParams from './useChatParams';

interface UseMessageSendProps {
  messageId: string;
  role: 'consumer' | 'vendor';
  messageName: string;
}

interface FileItem {
  fileUniqueId: string;
  file: File;
  fileName: string;
}

function useMessageSend({ messageId, role, messageName }: UseMessageSendProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatType[]>([]);
  const [attachedFile, setAttachedFile] = useState<FileItem | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const { consumerName, vendorName, solutionName, userImg } = useChatMeta();
  const { consumerSeq: consumerId, vendorSeq: vendorId } = useChatParams();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAttachedFile({
      fileUniqueId: uuidv4(),
      file,
      fileName: file.name,
    });

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setFilePreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setFilePreviewUrl(null);
    }
  };

  useEffect(() => {
    let unsubscribe: () => void;

    async function realTimeMessages() {
      if (!consumerId || !vendorId) return;

      const roomId = await findChatExistingRoom(consumerId, vendorId);
      if (roomId) {
        const messagesRef = collection(db, 'chats', roomId, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'asc'));
        unsubscribe = onSnapshot(q, async (snapshot) => {
          const realTimeNewMessages = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
          })) as ChatType[];
          setMessages(realTimeNewMessages);
        });
      }
    }

    realTimeMessages();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [consumerId, vendorId, attachedFile]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.trim() && !attachedFile) return;

    const roomId = await findChatExistingRoom(consumerId, vendorId);
    const newRoomId = uuidv4();
    const targetRoomId = roomId || newRoomId;

    if (!roomId) {
      if (!consumerId) return;
      if (!vendorId) return;
      await createRoom(
        newRoomId,
        consumerName,
        vendorName,
        consumerId,
        vendorId,
        solutionName,
        userImg,
      );
    }

    const newMessage = {
      message,
      createdAt: serverTimestamp(),
      messageId,
      messageName,
      role,
      file: {
        fileUniqueId: attachedFile?.fileUniqueId,
        fileName: attachedFile?.fileName,
      },
    };

    await addDoc(collection(db, 'chats', targetRoomId, 'messages'), newMessage);

    if (attachedFile) {
      await ChatFilePost(
        Number(consumerId),
        Number(vendorId),
        attachedFile.fileUniqueId,
        'vendor',
        attachedFile.file,
      );
    }

    if (!attachedFile) {
      setMessage('');
    }
    setAttachedFile(null);
    setFilePreviewUrl(null);

    const fetchedMessages = await getMessagesById(targetRoomId);
    setMessages(fetchedMessages);
  }

  return {
    handleSubmit,
    message,
    setMessage,
    messages,
    handleFileChange,
    attachedFile,
    filePreviewUrl,
  };
}

export default useMessageSend;
