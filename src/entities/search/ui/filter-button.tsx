import { Button } from '@/shared/ui/button';
import cn from '@/shared/lib/utils';

export default function FilterButton({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  return (
    <Button
      asChild={false}
      className={cn(
        'bg-vendor-gray font-normal text-black hover:text-white',
        className,
      )}
    >
      {value}
    </Button>
  );
}
