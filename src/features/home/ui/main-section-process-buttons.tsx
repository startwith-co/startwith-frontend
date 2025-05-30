import { Button } from '@/shared/ui/button';

function MainSectionButtons() {
  return (
    <div className="mt-10 grid w-[500px] grid-cols-2 gap-8">
      <Button variant="textBlue" className="h-[120px] w-full" asChild={false}>
        제조
      </Button>
      <Button variant="textBlue" className="h-[120px] w-full" asChild={false}>
        의료
      </Button>
      <Button variant="textBlue" className="h-[120px] w-full" asChild={false}>
        물류/유통
      </Button>
      <Button variant="textBlue" className="h-[120px] w-full" asChild={false}>
        정보통신/IT
      </Button>
    </div>
  );
}

export default MainSectionButtons;
