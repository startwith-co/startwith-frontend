import nextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import ky from 'ky';
import { LoginRequest, LoginResponse } from '@/features/login/model/loginType';
import { toast } from 'react-toastify';

const { auth, handlers, signIn, signOut } = nextAuth({
  secret: '1004',
  providers: [
    CredentialsProvider({
      // 이 부분은 자체 로그인 로직을 구현합니다.
      name: 'credentials',
      credentials: {
        email: { label: '이메일', type: 'text' },
        password: { label: '비밀번호', type: 'password' },
      },

      async authorize(credentials): Promise<any> {
        const { email, password } = credentials || {};
        try {
          // 외부 서버와의 통신을 통해 유저 정보와 토큰을 가져옵니다.
          const response = await ky.post(
            `${process.env.NEXT_PUBLIC_MOCK_SERVER}/consumer/login`,
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
            };
          }
          return null;
        } catch (error) {
          toast.error('로그인 실패:');
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        // eslint-disable-next-line no-param-reassign
        token.accessToken = user?.accessToken;
        // eslint-disable-next-line no-param-reassign
        token.refreshToken = user?.refreshToken;
        // eslint-disable-next-line no-param-reassign
        token.consumerSeq = user?.consumerSeq;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      // eslint-disable-next-line no-param-reassign
      session.accessToken = token.accessToken;
      // eslint-disable-next-line no-param-reassign
      session.refreshToken = token.refreshToken;
      // eslint-disable-next-line no-param-reassign
      session.consumerSeq = token.consumerSeq;
      return session;
    },
  },
});

export const { GET, POST } = handlers;
