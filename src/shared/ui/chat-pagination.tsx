import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/shared/ui/pagination';
import useChatPaginationCaculator from '@/shared/model/useChatPaginationCaculator';
import { ChatRoom } from '@/shared/model/roomType';
import ChatRoomCard from '@/entities/chat/ui/chat-room-card';
import formatMainDate from '../lib/chat-main-date-format';
import useCurrentSession from '../model/useCurrentSession';

function ChatPagination({ rooms }: { rooms: ChatRoom[] }) {
  const { totalPages, handlePageChange, currentPage, paginatedRooms } =
    useChatPaginationCaculator({
      rooms,
    });
  const { session } = useCurrentSession();

  const getVisiblePages = (current: number, total: number) => {
    const pages: (number | string)[] = [];

    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current > 2) pages.push(1);
    if (current > 3) pages.push('...');

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i += 1) {
      pages.push(i);
    }

    if (current < total - 2) pages.push('...');
    if (current < total - 1) pages.push(total);

    return pages;
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);
  return (
    <div>
      <div className="flex flex-col gap-2.5">
        {paginatedRooms.map((room) => (
          <ChatRoomCard
            roomId={room.roomId}
            consumerId={room.consumerId}
            vendorId={room.vendorId}
            consumerName={room.consumerName}
            vendorName={room.vendorName}
            vendorSeq={String(room.vendorSeq)}
            key={room.roomId}
            role={session?.role}
            updatedDate={formatMainDate(room.lastMessage.updatedAt)}
            link={
              session?.role === 'vendor'
                ? `/vendor/chat?vendorId=${room.vendorId}&consumerId=${room.consumerId}`
                : `/chat?consumerId=${room.consumerId}&vendorId=${room.vendorId}`
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
