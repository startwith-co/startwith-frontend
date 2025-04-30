export default function ChatPage() {
  return (
    <div className="mt-[90px] grid grid-cols-[2fr_4fr_1.5fr] gap-6">
      <div className="h-[400px] w-full rounded-md bg-white shadow-md">검색</div>
      <div className="h-[400px] w-full rounded-md bg-white shadow-md">채팅</div>
      <div className="h-[400px] w-full rounded-md bg-white shadow-md">
        채팅 정보
      </div>
    </div>
  );
}
