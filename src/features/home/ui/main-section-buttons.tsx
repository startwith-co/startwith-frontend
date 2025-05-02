import { Button } from '@/shared/ui/button';

function MainSectionButtons() {
  return (
    <div className="mt-10 flex flex-row space-x-16">
      <Button variant="home" className="h-[150px] w-[300px]" asChild={false}>
        HRM(인사 관리)
      </Button>
      <Button variant="home" className="h-[150px] w-[300px]" asChild={false}>
        ERP(전사 자원 관리)
      </Button>
      <Button variant="home" className="h-[150px] w-[300px]" asChild={false}>
        CRM(고객 정보 및 관계 관리)
      </Button>
    </div>
  );
}
export default MainSectionButtons;
