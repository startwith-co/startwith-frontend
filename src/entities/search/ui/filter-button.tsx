import { Button } from '@/shared/ui/button';
import cn from '@/shared/lib/utils';

export default function FilterButton({
  value,
  className,
  isActive,
}: {
  value: string;
  className?: string;
  isActive?: boolean;
}) {
  return (
    <Button
      asChild={false}
      className={cn(
        'bg-vendor-gray font-normal text-black hover:text-white',
        className,
        isActive && 'bg-primary text-white',
      )}
    >
      {value}
    </Button>
  );
}
