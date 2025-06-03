'use client';

import Input from '@/shared/ui/input';
import VendorDropInput from '@/features/vendorRegister/ui/vendor-drop-input';
import VendorSelect from '@/shared/ui/vendor-select';

export default function VendorDetailInfo() {
  return (
    <div className="rounded-md bg-white px-[35px] py-7.5 shadow-md 2xl:pr-[104px]">
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
        <li className="items-start!">
          <span>예상 도입 성과 1</span>
          <div className="flex flex-col gap-[23px]">
            <Input
              type="text"
              className="bg-vendor-gray w-[220px] border-none text-center"
              placeholder="도입 성과명을 입력해주세요."
            />
            <div className="flex gap-5">
              <Input
                type="number"
                className="bg-vendor-gray h-[40px] w-[60px] border-none text-center"
                placeholder="0"
              />
              <VendorSelect
                onChange={() => {}}
                options={['%', '시간']}
                placeholder="%"
                triggerClassName="h-[40px] w-[60px] rounded-md bg-vendor-gray font-light items-center justify-center flex text-xs"
                itemsClassName="justify-center font-light bg-vendor-gray"
              />
              <VendorSelect
                onChange={() => {}}
                options={['감소', '증가']}
                placeholder="감소"
                triggerClassName="h-[40px] w-[60px] rounded-md bg-vendor-gray font-light items-center justify-center flex text-xs"
                itemsClassName="justify-center font-light bg-vendor-gray"
              />
            </div>
          </div>
        </li>
        <li>
          {/* TODO: 플러스 누르면 도입 성과 창이 늘어나는 방식 */}
          <span>예상 도입 성과 2</span>
          <Input
            type="text"
            className="bg-vendor-gray w-[220px] border-none text-center"
            placeholder="+"
          />
        </li>
      </ul>
    </div>
  );
}
