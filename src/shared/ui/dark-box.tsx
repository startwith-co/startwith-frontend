import cn from '@/shared/lib/utils';

export default function DarkBox({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('bg-vendor-gray rounded-md', className)}>{children}</div>
  );
}
