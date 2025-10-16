import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

// eslint-disable-next-line import/no-mutable-exports
let nextConfig: NextConfig = {
  reactStrictMode: false,
  transpilePackages: ['msw', 'next-auth'],
  images: {
    remotePatterns: [
      new URL('https://way-s3.s3.ap-northeast-2.amazonaws.com/**'),
      new URL('https://startwith-solu.s3.ap-northeast-2.amazonaws.com/**'),
      new URL('https://example.com/**'),
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '30mb',
    },
  },
  logging: {
    incomingRequests: {
      ignore: [
        /\/api\/auth\/session/, // NextAuth 세션 체크 무시
      ],
    },
  },
  webpack: (config) => {
    const newConfig = { ...config };

    if (process.env.SENTRY !== 'true') {
      newConfig.resolve = {
        ...newConfig.resolve,
        alias: {
          ...newConfig.resolve?.alias,
          '@sentry/nextjs': require.resolve('./src/sentry-dev.tsx'),
        },
      };
    }
    return newConfig;
  },
};

// Sentry 설정은 프로덕션(SENTRY=true)일 때만 적용
if (process.env.SENTRY === 'true') {
  nextConfig = withSentryConfig(nextConfig, {
    // Sentry 조직 슬러그 – Sentry 프로젝트가 속한 조직의 ID
    org: 'sejong',

    // Sentry 프로젝트 이름 – 오류가 기록될 프로젝트
    project: 'javascript-nextjs',

    // CI 환경이 아닐 때는 소스맵 업로드 관련 로그를 출력하지 않음 (로컬 빌드 시 출력 줄이기)
    silent: !process.env.CI,

    // 클라이언트에 대한 더 많은 소스맵을 업로드하여 오류 스택트레이스를 더 예쁘게 보여줌 (빌드 시간이 증가할 수 있음)
    widenClientFileUpload: true,

    // 클라이언트에서 Sentry로의 요청을 Next.js 서버를 통해 프록시함
    // - 광고 차단기 회피 가능
    // - 서버 부하 및 비용 증가 가능성 있음
    tunnelRoute: '/monitoring',

    // 콘솔에 찍히는 Sentry 관련 디버그 로그를 제거하여 번들 크기 절감
    disableLogger: true,

    // Vercel의 Cron Monitor 기능 자동 설정 (App Router route handlers에서는 아직 미지원)
    // - Sentry를 통한 스케줄 작업 모니터링 자동화
    automaticVercelMonitors: true,
  });
}

export default nextConfig;
