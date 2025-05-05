import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import IndustrySelectGrid from './signup-industry-form';

export default function SignupIndustryModal({
  open,
  setOpen,
  selectedIndustry,
  setSelectedIndustry,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedIndustry: string | null;
  setSelectedIndustry: (industry: string) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex h-auto w-[360px] flex-col items-center justify-center rounded-2xl border-0 bg-white px-6 pb-8">
        <DialogHeader>
          <DialogTitle className="mt-2 mb-3 text-center text-xl font-bold text-black">
            종사 산업군 선택
            <p className="text-sm font-light text-[#7A7A7A]">
              (중복 선택 불가)
            </p>
          </DialogTitle>
        </DialogHeader>
        <IndustrySelectGrid
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={setSelectedIndustry}
        />
      </DialogContent>
    </Dialog>
  );
}
