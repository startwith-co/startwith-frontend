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
        className={cn('px-3.5 py-2.5 text-xs hover:bg-black', className)}
      >
        {title}
      </DarkBox>
    </button>
  );
}
