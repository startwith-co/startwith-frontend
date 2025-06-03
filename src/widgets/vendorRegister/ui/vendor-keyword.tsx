import Input from '@/shared/ui/input';

export default function VendorKeyword() {
  return (
    <div className="rounded-md bg-white px-[35px] py-7.5 shadow-md 2xl:pr-[104px]">
      <h2 className="mb-6 text-lg font-semibold">키워드 검색 태그</h2>
      <ul className="flex w-full flex-col gap-6 [&>li]:flex [&>li]:items-center [&>li>span]:w-[139px] [&>li>span]:text-[13px]">
        <li>
          <span className="mr-4">
            키워드 입력<span className="text-red-500">*</span>
          </span>
          <div className="relative w-full">
            <Input
              className="bg-vendor-gray w-[220px] border-none text-center placeholder:text-[13px]"
              placeholder="키워드를 입력해주세요."
            />
          </div>
        </li>
      </ul>
    </div>
  );
}
