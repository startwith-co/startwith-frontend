'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import db from 'fire-config';
import { useSearchParams } from 'next/navigation';
import { ChatRoom } from './roomType';

function useGetChatRooms({ targetId }: { targetId: string }) {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const searchParams = useSearchParams();
  const id = searchParams.get(
    targetId === 'vendorSeq' ? 'vendorId' : 'consumerId',
  );

  useEffect(() => {
    let unsubscribe: () => void;

    const fetchRooms = async () => {
      if (!id) return;
      const q = query(collection(db, 'chats'), where(targetId, '==', id));

      unsubscribe = onSnapshot(q, (snapshot) => {
        const realTimeRooms = snapshot.docs.map((doc) => ({
          roomId: doc.id,
          ...doc.data(),
        })) as ChatRoom[];
        setRooms(realTimeRooms);
      });
    };

    fetchRooms();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [targetId, id]);

  return rooms;
}

export default useGetChatRooms;
