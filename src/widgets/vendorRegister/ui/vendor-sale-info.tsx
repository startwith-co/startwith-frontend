import Input from '@/shared/ui/input';

export default function VendorSaleInfo() {
  return (
    <div className="rounded-md border-2 border-[#404040] px-[35px] py-7.5 text-white">
      <h2 className="mb-6 text-lg font-semibold">판매 정보 입력</h2>
      <ul className="flex w-full flex-col gap-6 text-[13px] [&>li]:flex [&>li]:items-center [&>li>span]:w-[139px]">
        <li>
          <span>
            판매가<span className="text-red-500">*</span>
          </span>
          <div className="relative">
            <Input
              type="number"
              className="w-[270px] border-none bg-[#3D3D3D] text-center"
              value={0}
            />
            <span className="absolute top-1/2 right-3 -translate-y-1/2 transform text-white">
              원
            </span>
          </div>
        </li>
        <li>
          <span>할인율</span>
          <div className="relative">
            <Input
              type="number"
              className="w-[270px] border-none bg-[#3D3D3D] text-center"
              value={0}
            />
            <span className="absolute top-1/2 right-3 -translate-y-1/2 transform text-white">
              %
            </span>
          </div>
        </li>
        <li>
          <span>서비스가격</span>
          <div className="relative">
            <Input
              type="number"
              className="w-[270px] border-none bg-[#3D3D3D] text-center"
              value={0}
            />
            <span className="absolute top-1/2 right-3 -translate-y-1/2 transform text-white">
              원
            </span>
          </div>
        </li>
        <li>
          <span>
            개발 기간<span className="text-red-500">*</span>
          </span>
          <div className="relative">
            <Input
              type="number"
              className="w-[270px] border-none bg-[#3D3D3D] text-center"
              value={0}
            />
            <span className="absolute top-1/2 right-3 -translate-y-1/2 transform text-white">
              일
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}
