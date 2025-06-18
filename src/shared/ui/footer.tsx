import cn from '@/shared/lib/utils';
import Link from 'next/link';

interface FooterProps {
  mode?: 'vendor' | 'user';
}

/**
 *
 * @param mode 'vendor' | 'user'
 * @returns Footer
 */

export default function Footer({ mode = 'user' }: FooterProps) {
  return (
    <div
      className={cn(
        'mb-20 flex flex-col gap-28',
        mode === 'vendor'
          ? 'bg-vendor-bg text-vendor-secondary'
          : 'bg-transparent px-4 sm:px-8 md:px-16 lg:px-32 2xl:px-[300px]',
      )}
    >
      <ul className="border-[rgba(217, 217, 217, 1)] flex items-center justify-evenly border-y p-2.5 text-sm">
        <Link href="/">SOLU</Link>
        <Link href="/policy/terms-of-service">이용약관</Link>
        <Link href="/policy/operation-policy">운영정책</Link>
        <Link href="/policy/privacy-policy">개인정보처리방침</Link>
        <Link href="/policy/advertising-policy">광고제휴</Link>
      </ul>
      <div className="text-vendor-secondary flex flex-col gap-2.5 pl-14">
        <h2 className="text-xl font-extrabold">스타트윗 사업자 정보</h2>
        <ul className="flex flex-col gap-1 text-sm font-light">
          <li>상호명 : 스타트윗</li>
          <li>대표 : 정범준ㅣ개인정보보호책임자 : 정범준</li>
          <li>사업자등록번호 :352-12-02256ㅣ통신판매업신고 : </li>
          <li>유선전화번호 : 010-6409-8268</li>
          <li>Email : startwith0325@gmail.com</li>
          <li>
            사업장 주소 : 서울특별시 성북구 124, 유담관 16층
            B-1(정릉동,서경대학교)
          </li>
        </ul>
      </div>
    </div>
  );
}
