export default function VendorInfoWidget({
  vendorName,
  vendorPhone,
  vendorEmail,
}: {
  vendorName: string;
  vendorPhone: string;
  vendorEmail: string;
}) {
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-8">
      <div className="flex flex-col gap-5">
        <h2 className="text-lg font-semibold">주문자 정보</h2>
        <div className="flex w-full flex-col gap-3.5 rounded-md bg-white p-6 shadow-md">
          <div className="grid grid-cols-[120px_347px] items-center">
            <span className="text-[#7A7A7A]">기업명</span>
            <span>{vendorName}</span>
          </div>
          <div className="grid grid-cols-[120px_347px] items-center">
            <span className="text-[#7A7A7A]">연락처</span>
            <span>{vendorPhone}</span>
          </div>
          <div className="grid grid-cols-[120px_347px] items-center">
            <span className="text-[#7A7A7A]">Email</span>
            <span>{vendorEmail}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
