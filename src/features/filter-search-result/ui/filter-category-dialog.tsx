import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { ChevronDown } from 'lucide-react';

export default function FilterCategoryDialog({ name }: { name: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex w-full items-center justify-between">
          <span>{name}</span>
          <ChevronDown className="h-4 w-4 transition-transform" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[452px] gap-10 p-8">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            카테고리
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-8.5">
          <div className="flex items-center gap-4">
            <span className="w-24 font-semibold">솔루션 선택</span>
            <div>
              <Button asChild={false}>솔루션 선택</Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-24 font-semibold">산업군 선택</span>
            <div>
              <Button asChild={false}>산업군 선택</Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-24 font-semibold">예산 설정</span>
            <div>
              <Button asChild={false}>예산 설정</Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button asChild={false} className="w-full py-6">
            설정하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
