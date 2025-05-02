import { Button } from '@/shared/ui/button';
import Dropdown from '@/shared/ui/dropdown';
import Input from '@/shared/ui/input';

function DetailControl() {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <Dropdown
        buttonText="전체 상태"
        items={[{ label: 'ㄹㄹ' }, { label: 'ㄹㄹ' }, { label: 'ㄹㄹ' }]}
        buttonClassName="bg-[#F9F9F9] h-[40px] w-[130px] pl-5"
        menuClassName=""
      />
      <div className="flex flex-row gap-x-2">
        <Input
          placeholder="키워드 입력"
          className="h-[40px] w-[300px] border-0 bg-[#F9F9F9]"
        />
        <Button
          asChild={false}
          className="h-[40px] border-0 bg-black text-white"
        >
          조회
        </Button>
      </div>
    </div>
  );
}

export default DetailControl;
