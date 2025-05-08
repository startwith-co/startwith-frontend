import Input from '@/shared/ui/input';
import { MdOutlineAttachFile } from 'react-icons/md';

function Chatting() {
  return (
    <div className="flex h-full w-full flex-col rounded-3xl bg-white py-4 shadow-md">
      <div className="flex-1">
        {/* TODO: 채팅 메시지 영역 (추후 구현) */}
        <div className="p-4">채팅 메시지가 여기에 표시됩니다</div>
      </div>
      <div className="relative p-4">
        <Input
          type="search"
          placeholder="메시지 입력"
          className="h-[45px] rounded-3xl pl-4 placeholder:font-light"
        />
        <MdOutlineAttachFile className="absolute top-1/2 right-16 size-5.5 -translate-y-1/2 transform" />
        <button className="bg-primary absolute top-1/2 right-7 flex size-[30px] -translate-y-1/2 transform items-center justify-center rounded-full p-1 text-center text-white">
          →
        </button>
      </div>
    </div>
  );
}

export default Chatting;
