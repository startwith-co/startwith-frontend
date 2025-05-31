import Input from '@/shared/ui/input';
import {
  industryCategory,
  scaleCategory,
  surviceCategory,
} from '@/entities/vendorRegister/model/vendor-normal-info-category';
import Dropdown from '@/shared/ui/dropdown';

export default function VendorNormalInfo() {
  return (
    <div className="rounded-md bg-white px-[35px] py-7.5 shadow-md 2xl:pr-[104px]">
      <h2 className="mb-6 text-lg font-semibold">솔루션 기본 정보 입력</h2>
      <ul className="flex w-full flex-col gap-6 [&>li]:flex [&>li]:items-center [&>li>span]:w-[139px] [&>li>span]:text-[13px]">
        <li>
          <span className="mr-4">
            솔루션명<span className="text-red-500">*</span>
          </span>
          <div className="relative w-full">
            <Input
              className="bg-vendor-gray border-none placeholder:text-[13px]"
              placeholder="솔루션명을 입력해주세요."
            />
            {/* TODO: 입력한 글자수에 따라 값 변경하기 */}
            <span className="absolute top-1/2 right-3 -translate-y-1/2 transform text-[13px]">
              0/100
            </span>
          </div>
        </li>
        <li>
          <span className="mr-4">
            솔루션 기본 설명<span className="text-red-500">*</span>
          </span>
          <div className="relative w-full">
            <Input
              className="bg-vendor-gray border-none placeholder:text-[13px]"
              placeholder="솔루션 기본 설명을 입력해주세요."
            />
            {/* TODO: 입력한 글자수에 따라 값 변경하기 */}
            <span className="absolute top-1/2 right-3 -translate-y-1/2 transform text-[13px]">
              0/300
            </span>
          </div>
        </li>
        <li>
          <span>
            솔루션 카테고리<span className="text-red-500">*</span>
          </span>
          <Dropdown
            buttonText="솔루션 카테고리 선택"
            items={surviceCategory.map((item) => ({
              id: item,
              label: item,
            }))}
            divClassName="h-[40px] w-[220px] rounded-md bg-vendor-gray font-light items-center justify-center flex text-xs"
            buttonClassName="w-[220px] justify-center font-light bg-vendor-gray"
            menuClassName="w-[220px] justify-center bg-vendor-gray"
          />
        </li>
        <li>
          <span>
            도입 가능 산업군<span className="text-red-500">*</span>
          </span>
          <Dropdown
            buttonText="산업군 카테고리 선택"
            items={industryCategory.map((item) => ({
              id: item,
              label: item,
            }))}
            divClassName="h-[40px] w-[220px] rounded-md bg-vendor-gray font-light items-center justify-center flex text-xs"
            buttonClassName="w-[220px] justify-center font-light bg-vendor-gray"
            menuClassName="w-[220px] justify-center bg-vendor-gray"
          />
        </li>
        <li>
          <span>
            도입 가능 기업 규모<span className="text-red-500">*</span>
          </span>
          <div className="flex gap-5">
            {scaleCategory.map((item) => (
              <button
                key={item}
                className="bg-vendor-gray rounded-md px-[15px] py-[13px] text-xs"
              >
                {item}
              </button>
            ))}
          </div>
        </li>
      </ul>
    </div>
  );
}
