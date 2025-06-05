import { useState, KeyboardEvent, ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import Input from '@/shared/ui/input';

export default function VendorKeyword() {
  const [inputValue, setInputValue] = useState('');
  const { setValue, watch } = useFormContext();

  const keywords = watch('keyword') || [];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // IME 입력 중일 때 발생하는 keydown 이벤트 중복 방지
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = inputValue;
      if (value && !keywords.includes(value)) {
        setValue('keyword', [...keywords, value]);
      }
      setInputValue('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setValue(
      'keyword',
      keywords.filter((k: string) => k !== keyword),
    );
  };

  return (
    <div className="rounded-md bg-white px-[35px] py-7.5 shadow-md 2xl:pr-[104px]">
      <h2 className="mb-6 text-lg font-semibold">키워드 검색 태그</h2>
      <ul className="flex w-full flex-col gap-6 [&>li]:flex [&>li]:items-center [&>li>span]:w-[139px] [&>li>span]:text-[13px]">
        <li>
          <span className="mr-4">
            키워드 입력<span className="text-red-500">*</span>
          </span>
          <div className="relative flex w-full flex-wrap items-center gap-2">
            <Input
              className="bg-vendor-gray w-[220px] border-none text-center placeholder:text-[13px]"
              placeholder="키워드를 입력해주세요."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <div className="ml-4 flex flex-wrap gap-2">
              {keywords.map((keyword: string) => (
                <button
                  key={keyword}
                  className="bg-vendor-gray flex cursor-pointer items-center rounded px-2 py-1 text-xs"
                  onClick={() => removeKeyword(keyword)}
                  title="클릭해서 삭제"
                >
                  {keyword} <span className="ml-1 text-red-500">×</span>
                </button>
              ))}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
