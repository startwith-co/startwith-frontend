import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import WhiteBox from '@/shared/ui/white-box';

export default function InquireCard() {
  return (
    <div className="flex flex-col gap-6">
      <WhiteBox className="flex w-full flex-col items-center justify-center p-6">
        <Avatar className="mb-3.5 size-26">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="text-xl font-bold">더비즈온</span>
        <Button asChild={false} className="mt-4.5 rounded-3xl">
          문의하기
        </Button>
      </WhiteBox>
    </div>
  );
}
