import DarkButton from '@/entities/vendorRegister/ui/dark-button';
import Input from '@/shared/ui/input';
import {
  applyTagCategory,
  industryCategory,
  scaleCategory,
  surviceCategory,
  surviceTypeCategory,
} from '@/entities/vendorRegister/model/vendor-normal-info-category';

export default function VendorNormalInfo() {
  return (
    <div className="rounded-md border-2 border-[#404040] px-[35px] py-7.5 text-white 2xl:pr-[104px]">
      <h2 className="mb-6 text-lg font-semibold">솔루션 기본 정보 입력</h2>
      <ul className="flex w-full flex-col gap-6 [&>li]:flex [&>li]:items-center [&>li>span]:w-[139px] [&>li>span]:text-[13px]">
        <li>
          <span className="mr-4">
            솔루션명<span className="text-red-500">*</span>
          </span>
          <div className="relative w-full">
            <Input
              className="border-none bg-[#3D3D3D] placeholder:text-[13px] placeholder:text-white"
              placeholder="서비스명을 입력해주세요"
            />
            {/* TODO: 입력한 글자수에 따라 값 변경하기 */}
            <span className="absolute top-1/2 right-3 -translate-y-1/2 transform text-[13px] text-white">
              0/100
            </span>
          </div>
        </li>
        <li>
          <span>
            서비스 카테고리<span className="text-red-500">*</span>
          </span>
          <div className="flex gap-4.5">
            {surviceCategory.map((category) => (
              <DarkButton key={category} title={category} />
            ))}
          </div>
        </li>
        <li className="flex-wrap">
          <span>
            도입 가능 산업군<span className="text-red-500">*</span>
          </span>
          <div className="flex gap-2">
            {industryCategory.map((category) => (
              <DarkButton key={category} title={category} />
            ))}
          </div>
        </li>
        <li>
          <span>
            도입 추천 기업 규모<span className="text-red-500">*</span>
          </span>
          <div className="flex gap-4.5">
            {scaleCategory.map((category) => (
              <DarkButton key={category} title={category} />
            ))}
          </div>
        </li>
        <li>
          <span>
            적용 가능 태그<span className="text-red-500">*</span>
          </span>
          <div className="flex gap-4.5">
            {applyTagCategory.map((category) => (
              <DarkButton key={category} title={category} />
            ))}
          </div>
        </li>
        <li>
          <span>
            서비스 형태<span className="text-red-500">*</span>
          </span>
          <div className="flex gap-4.5">
            {surviceTypeCategory.map((category) => (
              <DarkButton key={category} title={category} />
            ))}
          </div>
        </li>
      </ul>
    </div>
  );
}
