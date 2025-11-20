'use client';

import { useEffect, useRef, useState } from 'react';
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
  role: 'consumer' | 'vendor' | 'system';
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
  const imageFileRef = useRef<HTMLInputElement>(null);

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

  const handleFileRemove = () => {
    setAttachedFile(null);
    setFilePreviewUrl(null);
    if (imageFileRef.current) {
      imageFileRef.current.value = '';
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
  }, [consumerId, vendorId]);

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

    const fetchedMessages = await getMessagesById(targetRoomId);

    const now = new Date();
    const yy = String(now.getFullYear()).slice(2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const todayString = `${yy}.${mm}.${dd}`;

    const hasTodaySystemDate = fetchedMessages.some((msg) => {
      if (msg.role !== 'system') return false;
      let parsed;
      try {
        parsed = JSON.parse(msg.message);
      } catch {
        return false;
      }
      return parsed.type === 'system-date' && parsed.date === todayString;
    });

    if (!hasTodaySystemDate) {
      const systemMsg = {
        role: 'system',
        message: JSON.stringify({
          type: 'system-date',
          date: todayString,
        }),
        createdAt: serverTimestamp(),
      };

      await addDoc(
        collection(db, 'chats', targetRoomId, 'messages'),
        systemMsg,
      );
    }

    const newMessage = {
      message,
      createdAt: serverTimestamp(),
      messageId,
      messageName,
      role,
      file: attachedFile
        ? {
            fileUniqueId: attachedFile.fileUniqueId,
            fileName: attachedFile.fileName,
          }
        : null,
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

    setMessage('');
    setAttachedFile(null);
    setFilePreviewUrl(null);

    const refreshed = await getMessagesById(targetRoomId);
    setMessages(refreshed);
  }

  return {
    handleSubmit,
    message,
    setMessage,
    messages,
    handleFileChange,
    attachedFile,
    filePreviewUrl,
    handleFileRemove,
    imageFileRef,
  };
}

export default useMessageSend;
