import DarkBox from '@/shared/ui/dark-box';

export default function VendorChatWidget() {
  return (
    <div className="rounded-2xl border-2 border-[#404040] p-7">
      <h2 className="font-semibold text-white 2xl:text-xl">실시간 상담 현황</h2>
      <ul className="mt-5 flex flex-col gap-5">
        <li>
          <DarkBox className="w-full py-7 text-center text-xs text-white">
            실시간 상담 없음
          </DarkBox>
        </li>
      </ul>
    </div>
  );
}
