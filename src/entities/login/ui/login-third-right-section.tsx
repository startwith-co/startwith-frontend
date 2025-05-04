import Image from 'next/image';

const images = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  src: '/images/profileAdd.png',
  alt: `유저 ${i + 1}`,
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

function LoginThirdRightSection() {
  const columns = splitByStructure(images, columnStructure);

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center bg-white pt-5">
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

export default LoginThirdRightSection;
