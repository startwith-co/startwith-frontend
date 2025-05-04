import cn from '@/shared/lib/utils';

export default function WhiteBox({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-lg bg-white shadow-[1px_1px_20px_rgba(0,0,0,0.1)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
