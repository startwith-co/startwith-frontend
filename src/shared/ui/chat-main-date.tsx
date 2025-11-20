interface ChatUpdateDateProps {
  updateData: string;
}

function ChatUpdateDate({ updateData }: ChatUpdateDateProps) {
  return (
    <div className="mx-auto flex h-[24px] w-[100px] items-center justify-center rounded-full bg-[#F5F5F5] text-xs text-gray-500">
      {updateData}
    </div>
  );
}

export default ChatUpdateDate;
