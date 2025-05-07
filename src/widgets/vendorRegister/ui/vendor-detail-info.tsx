import Input from '@/shared/ui/input';
import VendorDropInput from '@/features/vendorRegister/ui/vendor-drop-input';

export default function VendorDetailInfo() {
  return (
    <div className="rounded-md border-2 border-[#404040] px-[35px] py-7.5 text-white">
      <h2 className="mb-6 text-lg font-semibold">솔루션 상세 정보</h2>
      <ul className="flex w-full flex-col gap-6 text-[13px] [&>li]:flex [&>li]:items-center [&>li>span]:w-[139px]">
        <li>
          <span>
            대표 이미지<span className="text-red-500">*</span>
          </span>
          <VendorDropInput title="대표 이미지" />
        </li>
        <li>
          <span>
            솔루션 상세 설명 PDF<span className="text-red-500">*</span>
          </span>
          <VendorDropInput title="PDF 파일 등록" />
        </li>
        <li>
          <span>업무 효율 상승률</span>
          <div className="relative">
            <Input
              type="number"
              className="w-[270px] border-none bg-[#3D3D3D] text-center"
            />
            <span className="absolute top-1/2 right-3 -translate-y-1/2 transform text-white">
              %
            </span>
          </div>
        </li>
        <li>
          <span>업무 처리 속도 상승률</span>
          <div className="relative">
            <Input
              type="number"
              className="w-[270px] border-none bg-[#3D3D3D] text-center"
            />
            <span className="absolute top-1/2 right-3 -translate-y-1/2 transform text-white">
              %
            </span>
          </div>
        </li>
        <li>
          <span>업무 자동화 전환율</span>
          <div className="relative">
            <Input
              type="number"
              className="w-[270px] border-none bg-[#3D3D3D] text-center"
            />
            <span className="absolute top-1/2 right-3 -translate-y-1/2 transform text-white">
              %
            </span>
          </div>
        </li>
        <li>
          <span>업무 시간 단축</span>
          <div className="relative">
            <Input
              type="number"
              className="w-[270px] border-none bg-[#3D3D3D] text-center"
            />
            <span className="absolute top-1/2 right-3 -translate-y-1/2 transform text-white">
              시간
            </span>
          </div>
        </li>
        <li>
          <span>비용 절감</span>
          <div className="relative">
            <Input
              type="number"
              className="w-[270px] border-none bg-[#3D3D3D] text-center"
            />
            <span className="absolute top-1/2 right-3 -translate-y-1/2 transform text-white">
              원
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}
