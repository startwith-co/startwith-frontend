import nextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import ky from 'ky';
import { LoginResponse } from '@/features/login/model/loginType';

export const { auth, handlers, signIn, signOut } = nextAuth({
  secret: '1004',
  providers: [
    CredentialsProvider({
      // 이 부분은 자체 로그인 로직을 구현합니다.
      name: 'credentials',
      credentials: {
        email: { label: '이메일', type: 'text' },
        password: { label: '비밀번호', type: 'password' },
        target: { label: 'target', type: 'text' },
      },

      async authorize(credentials): Promise<any> {
        const { email, password, target } = credentials || {};
        try {
          let response;
          if (target === 'user') {
            response = await ky.post(
              `${process.env.NEXT_PUBLIC_API_URL}/api/b2b-service/consumer/login`,
              {
                json: {
                  email,
                  password,
                },
              },
            );
            const data: LoginResponse = await response.json();
            if (data) {
              // 유저 정보와 토큰을 NextAuth.js 세션에 저장합니다.
              return {
                consumerSeq: data.data.consumerSeq,
                accessToken: data.data.accessToken,
                refreshToken: data.data.refreshToken,
                uniqueType: data.data.consumerUniqueType,
                name: data.data.consumerName,
                role: 'consumer',
              };
            }
          }
          if (target === 'vendor') {
            response = await ky.post(
              `${process.env.NEXT_PUBLIC_API_URL}/api/b2b-service/vendor/login`,
              {
                json: {
                  email,
                  password,
                },
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            );
            const data: LoginResponse = await response.json();
            if (data) {
              // 유저 정보와 토큰을 NextAuth.js 세션에 저장합니다.
              return {
                vendorSeq: data.data.vendorSeq,
                accessToken: data.data.accessToken,
                refreshToken: data.data.refreshToken,
                uniqueType: data.data.vendorUniqueType,
                name: data.data.vendorName,
                role: 'vendor',
              };
            }
          }

          return null;
        } catch (error) {
          console.error('로그인 실패:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          consumerSeq: user.consumerSeq,
          vendorSeq: user.vendorSeq,
          uniqueType: user.uniqueType,
          name: user.name,
          role: user.role,
        };
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      return {
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        consumerSeq: token.consumerSeq,
        vendorSeq: token.vendorSeq,
        uniqueType: token.uniqueType,
        name: token.name,
        role: token.role,
      };
    },
  },
});
