import DarkBox from '@/shared/ui/dark-box';
import { IoIosStar } from 'react-icons/io';
import { MdOutlineMail } from 'react-icons/md';

export default function VendorServiceBoard() {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white px-[22.5px] py-5 shadow-md">
      <h2 className="mb-5 text-xl font-semibold">서비스 만족도</h2>
      <div className="grid h-full grid-cols-2 gap-5">
        <DarkBox className="px-6 py-5">
          <div className="flex flex-col gap-3.5">
            <span className="xl:text-sm 2xl:text-base">전체 평점</span>
            <p className="flex items-center gap-2">
              <IoIosStar className="size-5 2xl:size-6" />
              <span className="font-semibold 2xl:text-[23px]">0/5</span>
              {/* TODO: 평점별 막대 그래프 */}
            </p>
          </div>
        </DarkBox>
        <DarkBox className="px-6 py-5">
          <div className="flex flex-col gap-3.5">
            <span className="xl:text-sm 2xl:text-base">평균 응답 시간</span>
            <p className="flex items-center gap-2">
              <MdOutlineMail className="size-5 2xl:size-6" />
              <span className="2xl:text-[23px]">-</span>
            </p>
          </div>
        </DarkBox>
      </div>
    </div>
  );
}
