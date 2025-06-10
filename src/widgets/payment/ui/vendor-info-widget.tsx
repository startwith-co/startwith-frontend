export default function VendorInfoWidget({
  consumerName,
  consumerPhone,
  consumerEmail,
}: {
  consumerName: string;
  consumerPhone: string;
  consumerEmail: string;
}) {
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-8">
      <div className="flex flex-col gap-5">
        <h2 className="text-lg font-semibold">주문자 정보</h2>
        <div className="flex w-full flex-col gap-3.5 rounded-md bg-white p-6 shadow-md">
          <div className="grid grid-cols-[120px_347px] items-center">
            <span className="text-[#7A7A7A]">기업명</span>
            <span>{consumerName}</span>
          </div>
          <div className="grid grid-cols-[120px_347px] items-center">
            <span className="text-[#7A7A7A]">연락처</span>
            <span>{consumerPhone}</span>
          </div>
          <div className="grid grid-cols-[120px_347px] items-center">
            <span className="text-[#7A7A7A]">Email</span>
            <span>{consumerEmail}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
