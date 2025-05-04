import DarkBox from '@/shared/ui/dark-box';

export default function VendorNoticeWidget() {
  return (
    <div className="max-w-full rounded-2xl border-2 border-[#404040] p-7">
      <h2 className="font-semibold text-white 2xl:text-xl">공지 사항</h2>
      <ul className="mt-5 flex flex-col gap-5">
        <li>
          <DarkBox className="flex flex-col gap-2.5 px-4 py-2.5 text-xs text-white">
            <h2 className="font-semibold">전상품 95% 할인</h2>
            <p className="text-[10px] text-[#AAAAAA]">
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
