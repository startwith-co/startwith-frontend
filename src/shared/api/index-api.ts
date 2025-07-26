import ky, { HTTPError } from 'ky';
import { toast } from 'react-toastify';
import { getSession } from 'next-auth/react';
import { getErrorDataFromKyError } from '../lib/error-handler';

const session = await getSession();
const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (req) => {
        if (!req.headers.get('Authorization')) {
          req.headers.set('Authorization', `Bearer ${session?.accessToken}`);
        }
      },
    ],

    beforeError: [
      async (error: HTTPError) => {
        const errorData = await getErrorDataFromKyError(error);
        toast.error(`[${errorData.code}] ${errorData.message}`);
        return error;
      },
    ],
  },
});

export default api;
