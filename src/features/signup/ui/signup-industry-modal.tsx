import CustomModal from '@/shared/ui/custommodal';
import { Button } from '@/shared/ui/button';
import IndustrySelectGrid from './signup-industry-form';

export default function SignupIndustryModal({
  open,
  setOpen,
  selectedIndustry,
  setSelectedIndustry,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedIndustry: { label: string; value: string } | null;
  setSelectedIndustry: (industry: { label: string; value: string }) => void;
}) {
  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title="종사 산업군을 선택해주세요"
      contentProps="flex h-auto w-[360px] flex-col items-center justify-center rounded-2xl border-0 bg-white pb-8"
      titleProps="mt-6 text-center text-lg font-bold text-black"
    >
      <IndustrySelectGrid
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
      />
      <Button
        asChild={false}
        type="button"
        variant="bgBlueGradient"
        className="mt-5 h-[45px] w-full self-center text-sm text-white"
        onClick={() => setOpen(false)}
      >
        산업군 선택 완료
      </Button>
    </CustomModal>
  );
}
