import { solutionCategoryLabels } from '@/shared/model/getCategoryList';
import Image from 'next/image';
import Link from 'next/link';

function HomeSolutionSection() {
  return (
    <section className="flex w-screen flex-col items-center overflow-x-hidden">
      <h1 className="mt-30 text-center text-4xl font-bold" id="top">
        어떤 솔루션이 필요하신가요?
      </h1>
      <br />
      <p className="mb-10 text-center">
        <span className="text-[#0066FF]">인스트루머</span>의 체계적인 솔루션
        분류 체계를 통해{' '}
        <span className="font-bold">더 정확하고, 간편하게</span> <br /> 온라인
        솔루션을 확인하고,
        <span className="text-[#0066FF]"> 비지니스 문제를 해결해보세요.</span>
      </p>
      <ul className="mb-50 flex list-none gap-6">
        {solutionCategoryLabels.map((button, index) => (
          <li key={button}>
            <Link
              href={`/search?category=${button}`}
              className="flex flex-col items-center"
            >
              <figure className="flex flex-col items-center">
                <Image
                  src={`/images/main${index + 1}.png`}
                  alt={`${button} 카테고리 이미지`}
                  width={200}
                  height={200}
                />
                <figcaption className="mt-2 text-xs font-bold">
                  {button}
                </figcaption>
              </figure>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default HomeSolutionSection;
