import Dropdown from '@/shared/ui/dropdown';

function DetailControl() {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <Dropdown
        buttonText="전체 상태"
        items={[
          { label: '전체상태' },
          { label: '구매확정' },
          { label: '정산완료' },
        ]}
        buttonClassName="bg-[#F9F9F9] h-[40px] w-[130px] pl-5 mt-5"
        menuClassName=""
      />
    </div>
  );
}

export default DetailControl;
