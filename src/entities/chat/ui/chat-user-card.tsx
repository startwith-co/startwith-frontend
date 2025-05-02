function ChatUserCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-gray-100 p-2.5 text-sm">
      <p className="text-gray-500">{title}</p>
      <p>{content}</p>
    </div>
  );
}

export default ChatUserCard;
