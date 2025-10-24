'use client';

import { ReactNode, FormEvent } from 'react';

interface CustomFormProps {
  onSubmit: (formData: FormData) => void | Promise<void>;
  children: ReactNode;
  button: ReactNode;
  className?: string;
}

export default function CustomForm({
  onSubmit,
  children,
  button,
  className = 'space-y-6',
}: CustomFormProps) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
      {button}
    </form>
  );
}
