export default function VendorEarn() {
  return (
    <div>
      <h2 className="mb-5 text-xl font-semibold text-white">예상 정산액</h2>
      <div className="flex max-h-[191px] flex-col items-center justify-center rounded-md border-2 border-[#404040] pt-7.5 pb-[54px] text-white">
        <h2 className="mb-7.5 text-2xl font-bold">25.07 1주차</h2>
        <ul className="flex items-center gap-5 text-center">
          <li className="flex flex-col">
            <span>총 매출액</span>
            <span>15,000,000원</span>
          </li>
          <span className="text-xl text-white">-</span>
          <li className="flex flex-col">
            <span>결제 수수료</span>
            <span>300,000원</span>
          </li>
          <span className="text-xl text-white">-</span>
          <li className="flex flex-col">
            <span>판매 수수료</span>
            <span>900,000원</span>
          </li>
          <span className="text-xl text-white">=</span>
          <li className="flex flex-col">
            <span>예산 정산액</span>
            <span>13,800,000원</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
