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
import { useSearchParams } from 'next/navigation';
import createRoom from '@/shared/api/create-room';
import { v4 as uuidv4 } from 'uuid';
import findChatExistingRoom from '@/shared/api/find-chat-existing-room';
import getMessagesById from '@/shared/api/get-messages-by-id';
import db from 'fire-config';
import { ChatType } from '@/entities/chat/model/type';
import { useRoomId } from './RoomIdProvider';
import { useChatMeta } from './ChatMetaProvider';
import useCurrentSession from './useCurrentSession';
import ChatFilePost from '../api/chat-file-post';

interface UseMessageSendProps {
  messageId: string;
  messageName: string;
  attachedFile?: File;
}

function useMessageSend({ messageId, messageName }: UseMessageSendProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatType[]>([]);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const { session } = useCurrentSession();
  const { curRoomId, setCurRoomId } = useRoomId();
  const {
    consumerName,
    vendorName,
    vendorSeq,
    consumerSeq,
    solutionName,
    userImg,
  } = useChatMeta();

  const searchParams = useSearchParams();
  const consumerId = searchParams.get('consumerId') as string;
  const vendorId = searchParams.get('vendorId') as string;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAttachedFile(file);

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
      if (!consumerId || !vendorId || consumerId === vendorId) return;

      const roomId = await findChatExistingRoom(consumerId, vendorId);
      if (roomId) {
        setCurRoomId(roomId);

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
  }, [curRoomId, setCurRoomId, consumerId, vendorId, attachedFile]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.trim() && !attachedFile) return;

    const roomId = await findChatExistingRoom(consumerId, vendorId);
    const newRoomId = uuidv4();
    const targetRoomId = roomId || newRoomId;

    if (!roomId) {
      if (!session?.consumerSeq) return;
      if (!vendorSeq) return;
      await createRoom(
        newRoomId,
        consumerId,
        vendorId,
        consumerName,
        vendorName,
        session.consumerSeq.toString(),
        vendorSeq.toString(),
        solutionName,
        userImg,
      );
      setCurRoomId(newRoomId);
    }

    const newMessage = {
      message,
      createdAt: serverTimestamp(),
      messageId,
      messageName,
      file: !!attachedFile,
    };

    const docRef = await addDoc(
      collection(db, 'chats', targetRoomId, 'messages'),
      newMessage,
    );

    await updateDoc(doc(db, 'chats', targetRoomId), {
      lastMessage: {
        ...newMessage,
        updatedAt: newMessage.createdAt,
      },
    });

    if (session?.role && attachedFile) {
      await ChatFilePost(
        consumerSeq,
        vendorSeq,
        docRef.id,
        session?.role,
        attachedFile,
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
