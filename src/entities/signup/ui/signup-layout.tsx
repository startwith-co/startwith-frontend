import { ReactNode } from 'react';

interface SignupLayoutProps {
  title: string;
  content?: string;
  description?: string;
  children: ReactNode;
}

function SignupLayout({
  title,
  description,
  content,
  children,
}: SignupLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-t from-[#F4F8FF] to-[#DBE8FF]">
      <h1 className="mt-3 mb-2 text-4xl font-bold text-[#5b5bff]">SOLU</h1>
      <p className="mb-5 text-xl font-extrabold text-black">{title}</p>
      {content && (
        <p className="mb-10 text-center text-sm whitespace-pre-line text-[#7A7A7A]">
          {content}
        </p>
      )}

      <div className="flex w-full max-w-md flex-col items-center space-y-6">
        {description && (
          <h2 className="text-center text-lg font-extrabold tracking-tighter">
            {description}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}
export default SignupLayout;
