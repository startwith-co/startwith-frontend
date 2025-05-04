import cn from '@/shared/lib/utils';

export default function DarkBox({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('rounded-md bg-[#3D3D3D]', className)}>{children}</div>
  );
}
