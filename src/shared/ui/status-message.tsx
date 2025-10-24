import cn from '@/shared/lib/utils';

interface StatusMessageProps {
  message?: string;
  className?: string;
  status: 'success' | 'error' | 'warning';
}

export default function StatusMessage({
  message,
  className,
  status,
}: StatusMessageProps) {
  const colorClass = {
    success: 'text-green-600',
    error: 'text-red-500',
    warning: 'text-yellow-600',
  }[status];

  if (!message) return null;

  return (
    <p className={cn('mt-1 indent-2 text-xs', colorClass, className)}>
      {message}
    </p>
  );
}
