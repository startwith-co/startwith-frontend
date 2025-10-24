import cn from '@/shared/lib/utils';

function ErrorMessage({
  message,
  className,
}: {
  message: string | undefined;
  className?: string;
}) {
  return (
    <p className={cn('mt-1 indent-2 text-xs text-red-500', className)}>
      {message}
    </p>
  );
}

export default ErrorMessage;
