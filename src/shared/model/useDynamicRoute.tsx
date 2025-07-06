import { useEffect, useState } from 'react';
import useGetChatRooms from '@/shared/model/useGetChatRooms';
import { useSession } from 'next-auth/react';

function useDynamicRoute() {
  const rooms = useGetChatRooms({ targetId: 'vendorId' });
  const { data: session } = useSession();
  const [dynamicRoute, setDynamicRoute] = useState({
    label: '실시간 상담 관리',
    href: `/vendor/chat?vendorId=${session?.uniqueType}`,
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
