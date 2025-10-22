import Image from 'next/image';

const images = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  src: i % 2 === 0 ? '/images/musaic-logo.png' : '/images/solu-logo.png',
  alt: i % 2 === 0 ? `뮤직 로고 ${i + 1}` : `솔루 로고 ${i + 1}`,
}));

const columnStructure = [3, 4, 3];

function splitByStructure(arr: typeof images, structure: number[]) {
  const columns: (typeof images)[] = [];
  let start = 0;
  structure.forEach((count) => {
    columns.push(arr.slice(start, start + count));
    start += count;
  });
  return columns;
}

interface CommonBoxListProps {
  boxProps: string;
}

function CommonBoxList({ boxProps }: CommonBoxListProps) {
  const columns = splitByStructure(images, columnStructure);

  return (
    <section className={boxProps}>
      <div className="flex items-center justify-center gap-x-6">
        {columns.map((col) => (
          <div key={col[0].id} className="flex flex-col gap-y-6">
            {col.map(({ id, src, alt }) => (
              <div
                key={id}
                className="float-up-down relative h-32 w-32 rounded-xl bg-white shadow-md"
              >
                <Image
                  src={src}
                  alt={alt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default CommonBoxList;
