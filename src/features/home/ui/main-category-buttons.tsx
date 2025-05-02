import { Button } from '@/shared/ui/button';
import '@/app/globals.css';

const buttonArray = [
  { label: 'BI' },
  { label: 'AI 솔루션' },
  { label: 'SCM' },
  { label: 'CMS' },
  { label: 'BPM' },
  { label: 'EAM' },
  { label: '회계/재무' },
  { label: 'KM' },
  { label: 'ECM' },
  { label: 'FSM' },
];

function MainCategoryButtons() {
  return (
    <div className="mt-10 w-full overflow-hidden">
      <div className="scroll-marquee mb-5 flex space-x-10">
        {[...buttonArray, ...buttonArray].map((button, i) => {
          const suffix = i < buttonArray.length ? '-1' : '-2';
          return (
            <Button
              key={button.label + suffix}
              variant="home"
              className="h-[60px] w-[150px]"
              asChild={false}
            >
              {button.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
export default MainCategoryButtons;
