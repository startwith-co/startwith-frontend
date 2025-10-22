import Image from 'next/image';
import '@/app/globals.css';

const dummyImages = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  src: i % 2 === 0 ? '/images/musaic-logo.png' : '/images/solu-logo.png',
  alt: i % 2 === 0 ? `뮤직 로고 ${i + 1}` : `솔루 로고 ${i + 1}`,
}));

// 3개의 열로 나누기
const chunkSize = Math.ceil(dummyImages.length / 3);
const columns = Array.from({ length: 3 }, (_, i) =>
  dummyImages.slice(i * chunkSize, (i + 1) * chunkSize),
);

// 각 열을 내부적으로 2개씩 묶기
const groupedColumns = columns.map((column) =>
  Array.from({ length: Math.ceil(column.length / 2) }, (_, i) =>
    column.slice(i * 2, i * 2 + 2),
  ),
);

function LoginCustomSection() {
  const animations = [
    'animate-slide-up',
    'animate-slide-down',
    'animate-slide-up',
  ];

  return (
    <div className="relative flex h-screen flex-row justify-center gap-6 overflow-hidden bg-gradient-to-t from-[#F4F8FF] to-[#DBE8FF] px-4">
      {groupedColumns.map((column, colIdx) => (
        <div
          key={`col-${column[0][0].id}`}
          className={`${animations[colIdx]} flex flex-col gap-4`}
        >
          {column.map((pair) => (
            <div key={`pair-${pair[0].id}`} className="flex flex-col gap-4">
              {pair.map(({ id, src, alt }) => (
                <div
                  key={id}
                  className="relative h-40 w-40 rounded-xl bg-white shadow-md"
                >
                  <Image src={src} alt={alt} layout="fill" objectFit="cover" />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default LoginCustomSection;
