import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';

interface DetailItemProps {
  titleDate: string;
  status: string;
  statusDate: string;
  company: string;
  solution: string;
  price: string;
}

function DetailItem({
  titleDate,
  status,
  statusDate,
  company,
  solution,
  price,
}: DetailItemProps) {
  return (
    <div className="flex h-[300px] w-[840px] flex-col rounded-2xl bg-[#F5F5F5] p-5">
      <h1 className="text-2xl font-extrabold">{titleDate}</h1>
      <div className="align-center mt-5 flex flex-row space-x-10">
        <span className="text-lg font-bold">{status}</span>
        <span className="mt-1 text-sm font-light text-[#151515]">
          {statusDate}
        </span>
      </div>
      <div className="mt-3 flex flex-row justify-between">
        <div className="flex flex-row space-x-2">
          <Avatar className="bg-gray mb-2 flex h-[165px] w-[200px] rounded-sm">
            <AvatarImage src="/images/image.png" />
            <AvatarFallback>::</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-light text-[#151515]">
                {company}
              </span>
              <span className="text-lg font-bold">{solution}</span>
            </div>
            <span className="mt-15 text-lg font-bold">{price}</span>
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <Button
            variant="login"
            asChild={false}
            className="w-[100px] rounded-sm bg-[#4f7df9] text-white"
          >
            리뷰 남기기
          </Button>
          <Button
            variant="login"
            asChild={false}
            className="w-[100px] rounded-sm bg-white text-[#7A7A7A]"
          >
            문의하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DetailItem;
