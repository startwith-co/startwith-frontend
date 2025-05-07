import CustomModal from '@/shared/ui/custommodal';
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
    <CustomModal
      open={open}
      setOpen={setOpen}
      title="종사 산업군 선택"
      contentProps="flex h-auto w-[360px] flex-col items-center justify-center rounded-2xl border-0 bg-white px-6 pb-8"
      titleProps="mt-2 text-center text-xl font-bold text-black"
      subTitleDescription="(중복 선택 불가)"
    >
      <IndustrySelectGrid
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
      />
    </CustomModal>
  );
}
