'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import db from 'fire-config';
import { ChatRoom } from './roomType';
import useCurrentSession from './useCurrentSession';

function useGetChatRooms({ targetId }: { targetId: string }) {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const { session } = useCurrentSession();
  console.log('session', session);
  useEffect(() => {
    let unsubscribe: () => void;

    const fetchRooms = async () => {
      if (!session) return;
      const q = query(
        collection(db, 'chats'),
        where(targetId, '==', session.uniqueType),
      );

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
  }, [targetId, session]);

  return rooms;
}

export default useGetChatRooms;
