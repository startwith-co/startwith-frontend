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
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import db, { storage } from 'fire-config';
import { Message } from './roomType';
import { useRoomId } from './RoomIdProvider';
import { useChatMeta } from './ChatMetaProvider';
import useCurrentSession from './useCurrentSession';

interface UseMessageSendProps {
  messageId: string;
  messageName: string;
  attachedFile?: File;
}

function useMessageSend({ messageId, messageName }: UseMessageSendProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const { session } = useCurrentSession();
  const { curRoomId, setCurRoomId } = useRoomId();
  const { consumerName, vendorName, vendorSeq } = useChatMeta();

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
  }, [curRoomId, setCurRoomId, consumerId, vendorId]);

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
        messageId,
        message,
        messageName,
        session.consumerSeq.toString(),
        vendorSeq.toString(),
      );
      setCurRoomId(newRoomId);
    }

    /* TODO: 파일 첨부 기능 구현 */

    // let fileData = null;

    // if (attachedFile) {
    //   const fileRef = ref(
    //     storage,
    //     `chats/${targetRoomId}/${Date.now()}_${attachedFile.name}`,
    //   );
    //   console.log(fileData);
    //   await uploadBytes(fileRef, attachedFile);
    //   const fileUrl = await getDownloadURL(fileRef);

    //   fileData = {
    //     name: attachedFile.name,
    //     type: attachedFile.type,
    //     url: fileUrl,
    //   };
    // }

    const newMessage = {
      message,
      createdAt: serverTimestamp(),
      messageId,
      messageName,
      // file: fileData,
    };

    await addDoc(collection(db, 'chats', targetRoomId, 'messages'), newMessage);

    await updateDoc(doc(db, 'chats', targetRoomId), {
      lastMessage: {
        ...newMessage,
        updatedAt: newMessage.createdAt,
      },
    });

    setMessage('');
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
    setMessages,
    handleFileChange,
    attachedFile,
    filePreviewUrl,
  };
}

export default useMessageSend;
