import { Button } from '@/shared/ui/button';

function PaginationControl() {
  return (
    <div className="mt-3 mb-5 flex w-full flex-row items-center justify-center space-x-2">
      <Button
        asChild={false}
        className="size-8 bg-[#F4F4F4] font-bold text-black"
      >
        1
      </Button>
      <Button
        asChild={false}
        className="size-8 bg-[#F4F4F4] font-bold text-black"
      >
        2
      </Button>
      <Button
        asChild={false}
        className="size-8 bg-[#F4F4F4] font-bold text-black"
      >
        3
      </Button>
    </div>
  );
}

export default PaginationControl;
