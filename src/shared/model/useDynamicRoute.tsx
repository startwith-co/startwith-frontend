import { useEffect, useState } from 'react';
import useGetChatRooms from '@/shared/model/useGetChatRooms';

function useDynamicRoute() {
  const rooms = useGetChatRooms({ targetId: 'vendorId' });
  const [dynamicRoute, setDynamicRoute] = useState({
    label: '실시간 상담 관리',
    href: '/vendor/chat',
  });
  useEffect(() => {
    if (rooms.length > 0) {
      setDynamicRoute({
        label: '실시간 상담 관리',
        href: `/vendor/chat?vendorId=${rooms[0].vendorId}&consumerId=${rooms[0].consumerId}`,
      });
    }
  }, [rooms]);

  return dynamicRoute;
}

export default useDynamicRoute;
