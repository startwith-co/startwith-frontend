import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';

export default function VendorSubmitModal({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="flex h-[200px] w-[500px] flex-col items-center justify-center">
        <DialogTitle className="sr-only">솔루션 등록 완료</DialogTitle>
        <p className="text-lg font-semibold">솔루션이 등록되었습니다</p>
        <DialogFooter className="mt-4 flex gap-7.5">
          <Link href="/">
            <Button
              asChild={false}
              className="text-primary hover:text-primary h-[60px] w-[200px] bg-white font-semibold shadow-md hover:bg-white"
              onClick={() => setOpenDialog(false)}
              type="button"
            >
              SOLU에서 확인하기
            </Button>
          </Link>
          <Link href="/vendor">
            <Button
              asChild={false}
              variant="default"
              className="h-[60px] w-[200px] font-semibold shadow-md"
              onClick={() => setOpenDialog(false)}
              type="button"
            >
              밴더 HOME으로 돌아가기
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
