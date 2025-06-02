import { Button } from '@/shared/ui/button';
import cn from '@/shared/lib/utils';

export default function EditButton({
  onClick,
  title,
  className,
}: {
  onClick: () => void;
  title: string;
  className?: string;
}) {
  return (
    <Button
      asChild={false}
      className={cn(
        'bg-vendor-gray text-vendor-secondary h-[47px] w-[240px] border-none text-center',
        className,
      )}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}
