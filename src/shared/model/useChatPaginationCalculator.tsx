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

  return {
    currentPage,
    totalPages,
    visiblePages,
    paginatedRooms,
    handlePageChange,
  };
}

export default useChatPaginationCalculator;
