export default function VendorPolicy() {
  return (
    <div className="h-full">
      <span className="text-xl font-semibold">
        정산 정책
        <span className="text-vendor-secondary ml-2 text-sm font-light">
          (스크롤하여 확인 가능)
        </span>
      </span>

      <div className="mt-5 flex max-h-[330px] flex-col items-center justify-center rounded-md bg-white pt-7.5 pb-[54px] shadow-md">
        <div className="w-full overflow-y-auto px-6 text-sm leading-relaxed text-gray-800">
          <h3 className="mb-2 text-base font-semibold">1. 정산 기준일</h3>
          <p className="mb-4">
            SOLU는 기업 고객의 <strong>‘구매 확정’ 시점</strong>을 기준으로,
            최소 <strong>2영업일~최대 10영업일 이내</strong>에 정산을
            진행합니다.
          </p>

          <p className="mb-2 font-medium">결제 수단에 따른 ‘구매 확정’ 시점</p>
          <ul className="mb-4 list-disc pl-5">
            <li>무통장 입금: 결제 완료와 동시에 ‘구매 확정’</li>
            <li>
              신용카드 결제(PG): 결제 완료 시점으로부터 1주일 후 자동 ‘구매
              확정’
            </li>
          </ul>

          <h3 className="mb-2 text-base font-semibold">2. 정산 방식</h3>
          <p className="mb-2">
            밴더에게 지급되는 정산 금액은{' '}
            <strong>총 결제금액에서 다음 항목</strong>을 공제하여 정산합니다.
          </p>
          <ul className="mb-4 list-disc pl-5">
            <li>판매 수수료: SOLU 플랫폼 수수료 (거래 단가 기준 차등 적용)</li>
            <li>
              결제 수수료: 결제 방식(PG)에 따라 발생하는 수수료 (약 3% 내외)
            </li>
          </ul>

          <h3 className="mb-2 text-base font-semibold">3. 판매 수수료율</h3>
          <p className="mb-2">
            월 환산 매출액을 기준으로 다음과 같이 <strong>차등 수수료율</strong>
            이 적용됩니다.
          </p>
          <ul className="mb-4 list-disc pl-5">
            <li>200만 원 미만: 8%</li>
            <li>200만 원 이상: 5%</li>
          </ul>

          <p className="mb-2">
            월 환산 매출액은 단일 계약의 총금액을{' '}
            <strong>12개월로 나눈 값</strong>으로 산정합니다.
          </p>

          <p>
            예시) 1,800만 원 단일 계약의 월 환산 매출액은 150만 원이며, 이에
            따라 수수료율 <strong>8%</strong>가 적용됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
