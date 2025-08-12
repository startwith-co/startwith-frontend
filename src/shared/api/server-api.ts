import ky, { HTTPError } from 'ky';
import { auth } from '@/auth';
import getErrorDataFromKyError from '../lib/error-handler';

const serverApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (req) => {
        if (!req.headers.get('Authorization')) {
          const session = await auth();
          req.headers.set('Authorization', `Bearer ${session?.accessToken}`);
        }
      },
    ],
    beforeError: [
      async (error: HTTPError) => {
        const errorData = await getErrorDataFromKyError(error);
        console.log(errorData);
        return error;
      },
    ],
  },
});

export default serverApi;
