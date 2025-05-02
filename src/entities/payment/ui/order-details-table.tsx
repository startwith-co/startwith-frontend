export default function OrderDetailsTable() {
  return (
    <table className="w-full text-left">
      <thead className="border-b border-black">
        <tr className="text-[rgba(167,167,167,1)]">
          <th className="px-3 py-2">상세 항목</th>
          <th className="px-3 py-2">작업일</th>
          <th className="px-3 py-2">가격</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-3 py-2">더비즈온 중견기업 전용 ERP 구축</td>
          <td className="px-3 py-2">60일</td>
          <td className="px-3 py-2">10,000원</td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <td className="px-3 py-2">더비즈온 중견기업 전용 ERP 구축</td>
          <td className="px-3 py-2">60일</td>
          <td className="px-3 py-2">10,000원</td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <td className="px-3 py-2">더비즈온 중견기업 전용 ERP 구축</td>
          <td className="px-3 py-2">60일</td>
          <td className="px-3 py-2">10,000원</td>
        </tr>
      </tbody>
    </table>
  );
}
