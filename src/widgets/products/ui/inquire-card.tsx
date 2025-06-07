import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import WhiteBox from '@/shared/ui/white-box';

export default function InquireCard({ vendorName }: { vendorName: string }) {
  return (
    <div className="flex flex-col gap-6">
      <WhiteBox className="flex flex-col items-center justify-center p-6">
        <Avatar className="mb-3.5 size-26">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="text-xl font-bold">{vendorName}</span>
        <Button asChild={false} className="mt-4.5 w-full rounded-3xl">
          실시간 상담하기
        </Button>
      </WhiteBox>
    </div>
  );
}
