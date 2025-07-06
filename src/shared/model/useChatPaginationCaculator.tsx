import { useState } from 'react';
import { ChatRoom } from './roomType';

function useChatPaginationCalculator({ rooms }: { rooms: ChatRoom[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(rooms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRooms = rooms.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return {
    currentPage,
    totalPages,
    paginatedRooms,
    handlePageChange,
  };
}

export default useChatPaginationCalculator;
