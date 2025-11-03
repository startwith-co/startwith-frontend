import { memo } from 'react';

interface ChatMainDateProps {
  mainData: string;
}

function ChatMainDate({ mainData }: ChatMainDateProps) {
  return (
    <div className="flex items-center justify-center">
      <span className="mt-3 mb-2 inline-flex h-[24px] min-w-[100px] items-center justify-center rounded-full bg-[#F5F5F5] px-5 py-2 text-xs leading-none whitespace-nowrap text-[#727272]">
        {mainData}
      </span>
    </div>
  );
}

export default memo(ChatMainDate);
