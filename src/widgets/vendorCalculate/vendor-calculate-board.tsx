import DarkBox from '@/shared/ui/dark-box';

export default function VendorCalculateBoard() {
  return (
    <div className="h-[206px]">
      <h2 className="mb-5 text-xl font-semibold">정산 관리 현황</h2>
      <div className="flex h-[162px] items-center rounded-md bg-white px-8 py-10 shadow-md 2xl:px-16">
        <div className="grid w-full grid-cols-3 gap-1 sm:gap-2 md:gap-3 lg:gap-4">
          {['결제 대기', '구매 확정', '정산 대기'].map((label) => (
            <div key={label} className="flex flex-col items-center">
              <DarkBox className="xs:min-w-[2.5rem] xs:max-w-[3rem] mb-1 flex aspect-square w-full max-w-[2.5rem] min-w-[2rem] items-center justify-center text-xl sm:max-w-[4rem] sm:min-w-[3rem] sm:text-2xl md:max-w-[5rem] md:min-w-[3.5rem] md:text-3xl 2xl:max-w-[5.625rem] 2xl:min-w-[4rem] 2xl:text-4xl">
                -
              </DarkBox>
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
