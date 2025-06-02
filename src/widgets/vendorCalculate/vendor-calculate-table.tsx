export default function VendorCalculateTable() {
  return (
    <div className="overflow-hidden rounded-md shadow-md">
      <table className="w-full border-separate border-spacing-0 text-center text-[13px]">
        <thead className="bg-vendor-gray [&>tr>th]:border [&>tr>th]:border-gray-200 [&>tr>th]:py-3">
          <tr className="font-semibold">
            <th>정산상태</th>
            <th>솔루션명</th>
            <th>솔루션 가격</th>
            <th>정산일</th>
            <th>정산 금액</th>
            <th>구매 고객</th>
          </tr>
        </thead>
        <tbody className="bg-white [&>tr>td]:border [&>tr>td]:border-gray-200 [&>tr>td]:py-3">
          <tr>
            <td>정산대기</td>
            <td>3D 스캔 솔루션</td>
            <td>150,000원</td>
            <td>
              2025.01.01
              <br />
              <span className="text-vendor-secondary">(2025.02.01 예정)</span>
            </td>
            <td>150,000원</td>
            <td>(주)철강제일</td>
          </tr>
          <tr>
            <td>정산대기</td>
            <td>치아보철물 자동 생성 솔루션</td>
            <td>3,000,000원</td>
            <td>
              2025.01.01
              <br />
              <span className="text-vendor-secondary">(2025.02.01 예정)</span>
            </td>
            <td>2,700,000원</td>
            <td>(주)철강제일</td>
          </tr>
          <tr>
            <td>정산완료</td>
            <td>치아보철물 자동 생성 솔루션</td>
            <td>3,000,000원</td>
            <td>2025.01.01</td>
            <td>2,700,000원</td>
            <td>(주)철강제일</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
