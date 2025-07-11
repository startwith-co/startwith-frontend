import DarkBox from '@/shared/ui/dark-box';
import cn from '@/shared/lib/utils';

export default function DarkButton({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <button>
      <DarkBox
        className={cn('hover:bg-primary px-3.5 py-2.5 text-xs', className)}
      >
        {title}
      </DarkBox>
    </button>
  );
}
