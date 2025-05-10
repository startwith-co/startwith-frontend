'use client';

import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

import createRoom from '@/shared/api/create-room';
import { v4 as uuidv4 } from 'uuid';
import { useRoomId } from '@/shared/model/RoomIdProvider';
import { notFound } from 'next/navigation';
import findChatExistingRoom from '@/shared/api/find-chat-existing-room';
import getMessagesById from '@/shared/api/get-messages-by-id';
import { Message } from './roomType';
import db from '../../../fire-config';

interface UseMessageSendProps {
  messageId: string;
  messageName: string;
  userName: string;
  vendorName: string;
  vendorId: string;
  userId: string;
}

function useMessageSend({
  messageId,
  userName,
  vendorName,
  vendorId,
  userId,
  messageName,
}: UseMessageSendProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { setCurRoomId, curRoomId } = useRoomId();

  useEffect(() => {
    let unsubscribe: () => void;

    async function realTimeMessages() {
      if (!userId || !vendorId) notFound();

      const roomId = await findChatExistingRoom(userId, vendorId);
      if (roomId) {
        setCurRoomId(roomId);

        const messagesRef = collection(db, 'chats', roomId, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'asc')); // 정렬 추가

        unsubscribe = onSnapshot(q, (snapshot) => {
          const realTimeNewMessages = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
          })) as Message[];
          setMessages(realTimeNewMessages);
        });
      }
    }

    realTimeMessages();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [curRoomId, setCurRoomId, userId, vendorId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.trim()) return;
    const roomId = await findChatExistingRoom(userId, vendorId);
    const newRoomId = uuidv4();

    if (!roomId) {
      await createRoom(
        newRoomId,
        userId,
        vendorId,
        userName,
        vendorName,
        messageId,
        message,
        messageName,
      );
      setCurRoomId(newRoomId);
    }

    const newMessage = {
      message,
      createdAt: serverTimestamp(),
      messageId,
      messageName,
    };

    const targetRoomId = roomId || newRoomId;

    await addDoc(collection(db, 'chats', targetRoomId, 'messages'), newMessage);

    await updateDoc(doc(db, 'chats', targetRoomId), {
      lastMessage: {
        ...newMessage,
        updatedAt: newMessage.createdAt,
      },
    });

    setMessage('');

    const fetchedMessages = await getMessagesById(targetRoomId);
    setMessages(fetchedMessages);
  }

  return { handleSubmit, message, setMessage, messages, setMessages };
}

export default useMessageSend;
