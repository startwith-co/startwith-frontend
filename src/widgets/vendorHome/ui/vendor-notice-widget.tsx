import DarkBox from '@/shared/ui/dark-box';

export default function VendorNoticeWidget() {
  return (
    <div className="rounded-2xl bg-white p-7 shadow-md">
      <h2 className="font-semibold 2xl:text-xl">공지 사항</h2>
      <ul className="mt-5 flex flex-col gap-5">
        <li>
          <DarkBox className="flex flex-col gap-2.5 px-4 py-2.5 text-xs font-semibold">
            <h2>전상품 95% 할인</h2>
            <p className="text-vendor-secondary text-[10px] font-light">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              nemo nulla ex illo, adipisci alias impedit aspernatur nobis,
              exercitationem minus ut quia laudantium dolore ducimus fugit
              soluta explicabo voluptatum voluptatibus.
            </p>
          </DarkBox>
        </li>
      </ul>
    </div>
  );
}
