'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import db from '../../../fire-config';
import { ChatRoom } from './roomType';

function useGetChatRooms({ targetId }: { targetId: string }) {
  const searchParams = useSearchParams();
  const userId = searchParams?.get(targetId);
  const [rooms, setRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'chats'), where(targetId, '==', userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const realTimeRooms = snapshot.docs.map((doc) => ({
        roomId: doc.id,
        ...doc.data(),
      })) as ChatRoom[];
      setRooms(realTimeRooms);
    });

    return () => unsubscribe();
  }, [userId]);

  return rooms;
}

export default useGetChatRooms;
