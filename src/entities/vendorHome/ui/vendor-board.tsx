import DarkBox from '@/shared/ui/dark-box';

export default function VendorBoard() {
  return (
    <div className="flex h-[198px] flex-col overflow-hidden rounded-2xl border-2 px-[22.5px] py-5 text-white">
      <h2 className="mb-2 text-base font-semibold sm:mb-3 sm:text-lg md:mb-4 md:text-xl">
        운영 현황
      </h2>
      <div className="grid w-full grid-cols-5 justify-between gap-1 sm:gap-2 md:gap-3 lg:gap-4">
        {[
          '실시간 상담 대기',
          '구매확정',
          '결제취소',
          '정산대기',
          '정산완료',
        ].map((label) => (
          <div key={label} className="flex flex-col items-center">
            <DarkBox className="xs:min-w-[2.5rem] xs:max-w-[3rem] flex aspect-square w-full max-w-[2.5rem] min-w-[2rem] items-center justify-center text-xl sm:max-w-[4rem] sm:min-w-[3rem] sm:text-2xl md:max-w-[5rem] md:min-w-[3.5rem] md:text-3xl 2xl:max-w-[5.625rem] 2xl:min-w-[4rem] 2xl:text-4xl">
              -
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
