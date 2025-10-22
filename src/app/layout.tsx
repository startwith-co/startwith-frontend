import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { ToastContainer } from 'react-toastify';
import ChatMetaProvider from '@/shared/model/ChatMetaProvider';
import { SessionProvider } from 'next-auth/react';
import AmplitudeContextProvider from './_providers/amplitude-provider';
import SentryProvider from './_providers/sentry-provider';

const pretendardFont = localFont({
  src: [
    {
      path: '../shared/fonts/PretendardVariable.woff2',
    },
  ],
  variable: '--font-pretendard',
  weight: '100 900',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SME B2B SaaS 마켓플레이스,SOLU',
  description:
    '기업 고객에게는 더 나은 의사 결정을 지원하며, 밴더에게는 더 나은 기회를 제공합니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className={`${pretendardFont.className}`}>
        <SessionProvider>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="light"
          />

          <ChatMetaProvider>
            <AmplitudeContextProvider userId="">
              {process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? (
                <> {children}</>
              ) : (
                <SentryProvider>{children}</SentryProvider>
              )}
            </AmplitudeContextProvider>
          </ChatMetaProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
