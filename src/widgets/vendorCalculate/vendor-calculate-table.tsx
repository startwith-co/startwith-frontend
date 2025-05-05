export default function VendorCalculateTable() {
  return (
    <div className="h-[621px] w-full rounded-md border border-[#7A7A7A] px-8 py-7.5">
      <h2 className="mb-5 text-lg font-semibold text-white">정산 현황</h2>
      <div className="rounded-md border border-white">
        <table className="w-full border-separate border-spacing-0 text-center text-[13px] text-white">
          <thead className="rounded-t-md bg-black [&>tr>th]:border [&>tr>th]:border-white [&>tr>th]:py-3">
            <tr>
              <th className="rounded-tl-md">솔루션 번호</th>
              <th>주문번호</th>
              <th>
                정산일
                <br />
                (정산 예정일)
              </th>
              <th>정산상태</th>
              <th>정산금액</th>
              <th>솔루션명</th>
              <th>판매가격</th>
              <th>할인율</th>
              <th>솔루션 가격</th>
              <th className="rounded-tr-md">구매 고객</th>
            </tr>
          </thead>
          <tbody className="rounded-b-md bg-[#3D3D3D] [&>tr>td]:border [&>tr>td]:border-[#7A7A7A] [&>tr>td]:py-3">
            <tr>
              <td>00000001</td>
              <td>00000001</td>
              <td>
                2025.01.01
                <br />
                (2025.02.01 예정)
              </td>
              <td>정산대기</td>
              <td>150,000원</td>
              <td>3D 스캔 솔루션</td>
              <td>150,000원</td>
              <td>0%</td>
              <td>150,000원</td>
              <td>(주)철강제일</td>
            </tr>
            <tr>
              <td>00000002</td>
              <td>00000001</td>
              <td>
                2025.01.01
                <br />
                (2025.02.01 예정)
              </td>
              <td>정산대기</td>
              <td>2,700,000원</td>
              <td>치아보철물 자동 생성 솔루션</td>
              <td>3,000,000원</td>
              <td>10%</td>
              <td>2,700,000원</td>
              <td>(주)철강제일</td>
            </tr>
            <tr>
              <td className="rounded-bl-md">00000003</td>
              <td>00000001</td>
              <td>2025.01.20</td>
              <td>정산완료</td>
              <td>2,500,000원</td>
              <td>치아보철물 자동 생성 솔루션</td>
              <td>3,000,000원</td>
              <td>10%</td>
              <td>2,700,000원</td>
              <td className="rounded-br-md">(주)철강제일</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
