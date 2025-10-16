import { auth } from '@/auth';
import EditInfo from '@/features/my/ui/edit-info';
import getConsumerInfo from '@/features/my/api/getConsumerInfo';

async function MyProfile() {
  const session = await auth();
  const res = await getConsumerInfo(session?.consumerSeq || 0);

  return (
    <section>
      <h1 className="mb-3 text-2xl font-bold">내 정보</h1>
      <div className="relative mb-40 rounded-xl bg-white p-8 shadow-md">
        {res.data ? (
          <EditInfo
            company={res.data.consumerName}
            email={res.data.email}
            phoneNumber={res.data.phoneNumber}
            industry={res.data.industry}
          />
        ) : (
          <p>오류 발생...</p>
        )}
      </div>
    </section>
  );
}

export default MyProfile;
