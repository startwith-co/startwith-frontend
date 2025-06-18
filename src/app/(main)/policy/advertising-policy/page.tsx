import Link from 'next/link';

export default function AdvertisingPolicy() {
  return (
    <div className="mx-auto my-10 max-w-4xl px-6 py-10 text-gray-800">
      <h1 className="mb-1 text-3xl font-bold">광고제휴</h1>
      <p className="mb-6 text-sm">
        법적 근거: 「표시·광고의 공정화에 관한 법률」, 「전자상거래 등에서의
        소비자보호에 관한 법률」
      </p>
      {[
        [
          '제1조 (광고 콘텐츠의 명확한 표시)',
          `‘스타트윗’은 광고성 콘텐츠에 대해 ‘광고’, ‘협찬’ 등의 문구를 명확히 표시하여 이용자가 이를 인지할 수 있도록 합니다.`,
        ],
        [
          '제2조 (광고주와의 계약)',
          `1. ‘스타트윗’은 광고주와의 계약 시 광고 내용, 기간, 수수료 등을 명확히 규정하며, 계약 내용을 성실히 이행합니다.\n2. ‘스타트윗’과 광고주는 이해상충이 발생하지 않도록 상호 신뢰에 기반한 기준을 준수하며, 특정 업체에 대한 과도한 편향 노출은 제한될 수 있습니다.`,
        ],
        [
          '제3조 (이용자 보호)',
          `‘스타트윗’은 광고로 인한 이용자의 피해를 최소화하기 위해 광고 내용을 사전에 검토하며, 허위·과장 광고를 방지합니다.`,
        ],
      ].map(([title, content]) => (
        <section key={title} className="mb-6">
          <h3 className="mb-1 text-lg font-semibold">{title}</h3>
          <p className="text-sm whitespace-pre-wrap text-gray-700">{content}</p>
        </section>
      ))}
      <section>
        <h3 className="mb-1 text-lg font-semibold">
          SOLU 광고제휴 희망시 아래의 구글폼 작성을 부탁드립니다.
        </h3>
        <Link href="/" className="underline">
          www.googleform.com
        </Link>
      </section>
    </div>
  );
}
