import api from '@/shared/api/index-api';
import { useSession } from 'next-auth/react';

export default function TestButton() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <button onClick={() => api.post('test').then((res) => console.log(res))}>
      test
    </button>
  );
}
