export default function Footer() {
  return (
    <div className="-translate-y-screen relative mb-20 ml-5 flex flex-col gap-28">
      <ul className="border-[rgba(217, 217, 217, 1)] flex items-center justify-evenly border-y p-2.5 text-sm">
        <li>SOLU</li>
        <li>이용약관</li>
        <li>운영정책</li>
        <li>개인정보처리방침</li>
        <li>광고제휴</li>
      </ul>
      <div className="flex flex-col gap-2.5 text-[rgba(122,122,122,1)]">
        <h2 className="text-xl font-extrabold">스타트윗 사업자 정보</h2>
        <ul className="flex flex-col gap-1 text-sm font-light">
          <li>대표 : 정범준ㅣ개인정보보호책임자 : 정범준</li>
          <li>사업자증록번호 :352-12-02256ㅣ통신판매업신고 : </li>
          <li>호스팅서비스제공자 : </li>
          <li>EMAIL : startwith0325@gamil.com</li>
          <li>
            주소 : 서울특별시 성북구 124, 유담관 16층 B-1(정릉동,서경대학교)
          </li>
        </ul>
      </div>
    </div>
  );
}
