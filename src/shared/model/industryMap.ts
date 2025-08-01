const industryToEn: Record<string, string> = {
  범용: 'BASIC',
  '금속/기계/자동차 부품 제조': 'METAL',
  '금형/정밀가공 제조': 'MOLD',
  '식음료/식품/포장 제조': 'FOOD',
  '전자·전기·배터리 제조': 'ELECTRONIC',
};

const industryToKo: Record<string, string> = {
  BASIC: '범용',
  METAL: '금속/기계/자동차 부품 제조',
  MOLD: '금형/정밀가공 제조',
  FOOD: '식음료/식품/포장 제조',
  ELECTRONIC: '전자·전기·배터리 제조',
};

export { industryToEn, industryToKo };
