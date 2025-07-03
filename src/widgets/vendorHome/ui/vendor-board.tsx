import DarkBox from '@/shared/ui/dark-box';
import getBoardCount from '../api/getBoardCount';
import switchBoardLabel from '../utils/switchBoardLabel';
import BoardCountType from '../model/type';

export default async function VendorBoard({
  vendorSeq,
}: {
  vendorSeq: number;
}) {
  const boardCount = await getBoardCount(vendorSeq);

  return (
    <div className="flex h-[201px] flex-col overflow-hidden rounded-2xl bg-white px-[22.5px] py-5 shadow-md">
      <h2 className="mb-2 text-base font-semibold sm:mb-3 sm:text-lg md:mb-4 md:text-xl">
        운영 현황
      </h2>
      <div className="grid w-full grid-cols-4 justify-between gap-1 sm:gap-2 md:gap-3 lg:gap-4">
        {['상담 대기', '구매 확정', '정산 대기', '정산 완료'].map((label) => (
          <div key={label} className="flex flex-col items-center">
            <DarkBox className="xs:min-w-[2.5rem] xs:max-w-[3rem] flex aspect-square w-full max-w-[2.5rem] min-w-[2rem] items-center justify-center text-xl sm:max-w-[4rem] sm:min-w-[3rem] sm:text-2xl md:max-w-[5rem] md:min-w-[3.5rem] md:text-3xl 2xl:max-w-[5.625rem] 2xl:min-w-[4rem] 2xl:text-4xl">
              {boardCount.data[
                switchBoardLabel(label) as keyof BoardCountType
              ] || 0}
            </DarkBox>
            <span className="xs:text-[0.6rem] mt-1 text-[0.5rem] sm:text-xs 2xl:text-sm">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
