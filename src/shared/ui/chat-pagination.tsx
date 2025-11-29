import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/shared/ui/pagination';
import useChatPaginationCalculator from '@/shared/model/useChatPaginationCalculator';
import { ChatRoom } from '@/shared/model/roomType';
import ChatRoomCard from '@/entities/chat/ui/chat-room-card';
import useCurrentSession from '../model/useCurrentSession';

function ChatPagination({
  rooms,
  search,
}: {
  rooms: ChatRoom[];
  search: string;
}) {
  const {
    totalPages,
    handlePageChange,
    currentPage,
    paginatedRooms,
    visiblePages,
  } = useChatPaginationCalculator({
    rooms,
  });
  const { session } = useCurrentSession();
  const filteredRooms = paginatedRooms.filter((room) => {
    if (session?.role === 'vendor') {
      return room.consumerName.toLowerCase().includes(search.toLowerCase());
    }
    return room.vendorName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <div className="flex flex-col gap-2.5">
        {filteredRooms.map((room) => (
          <ChatRoomCard
            roomId={room.roomId}
            consumerName={room.consumerName}
            vendorName={room.vendorName}
            vendorSeq={String(room.vendorSeq)}
            key={room.roomId}
            role={session?.role}
            link={
              session?.role === 'vendor'
                ? `/vendor/chat?vendorId=${room.vendorSeq}&consumerId=${room.consumerSeq}`
                : `/chat?consumerId=${room.consumerSeq}&vendorId=${room.vendorSeq}`
            }
            consumerSeq={String(room.consumerSeq)}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center">
          <Pagination className="mt-6">
            <PaginationContent className="px-1.3 flex">
              {visiblePages.map((page) => (
                <PaginationItem key={page.toString()}>
                  {page === '...' ? (
                    <span className="text-gray-400">...</span>
                  ) : (
                    <PaginationLink
                      className="size-8 text-xs"
                      href="#"
                      isActive={currentPage === page}
                      onClick={() => handlePageChange(Number(page))}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default ChatPagination;
