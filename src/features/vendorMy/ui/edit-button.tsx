import { Button } from '@/shared/ui/button';
import cn from '@/shared/lib/utils';

export default function EditButton({
  onClick,
  title,
  isLoading,
  className,
}: {
  onClick: () => void;
  title: string;
  isLoading: boolean;
  className?: string;
}) {
  return (
    <Button
      asChild={false}
      className={cn(
        'bg-vendor-gray text-vendor-secondary hover:bg-vendor-primary h-[47px] w-[240px] border-none text-center hover:text-white',
        className,
      )}
      onClick={isLoading ? undefined : onClick}
      disabled={isLoading}
    >
      {isLoading ? '수정 중...' : title}
    </Button>
  );
}
