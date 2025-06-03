import { Button } from '@/shared/ui/button';

function MainSectionButtons() {
  return (
    <div className="mt-10 grid w-[500px] grid-cols-2 gap-8">
      <Button
        variant="textBlue"
        className="h-[110px] w-full rounded-xl shadow-md"
        asChild={false}
      >
        CRM(고객 정보 및 관계 관리)
      </Button>
      <Button
        variant="textBlue"
        className="h-[110px] w-full rounded-xl shadow-md"
        asChild={false}
      >
        ERP(전사 자원 관리)
      </Button>
      <Button
        variant="textBlue"
        className="h-[110px] w-full rounded-xl shadow-md"
        asChild={false}
      >
        HR(성과 및 조직 관리)
      </Button>
      <Button
        variant="textBlue"
        className="h-[110px] w-full rounded-xl shadow-md"
        asChild={false}
      >
        HRM(인사 관리)
      </Button>
    </div>
  );
}

export default MainSectionButtons;
