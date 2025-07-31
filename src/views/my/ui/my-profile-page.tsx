import { auth } from '@/auth';
import EditInfo from '@/features/my/ui/edit-info';
import { ApiResponse } from '@/shared/model/apiType';
import { ConsumerInfoProps } from '@/views/vendorMy/model/type';
import serverApi from '@/shared/api/server-api';

async function MyProfile() {
  const session = await auth();

  const res = await serverApi
    .get(`api/b2b-service/consumer?consumerSeq=${session?.consumerSeq}`)
    .json<ApiResponse<ConsumerInfoProps>>();

  return (
    <section>
      <h1 className="mb-3 text-2xl font-bold">내 정보</h1>
      <div className="relative mb-40 rounded-xl bg-white p-8 shadow-md">
        <EditInfo
          company={res.data.consumerName}
          email={res.data.email}
          phoneNumber={res.data.phoneNumber}
        />
      </div>
    </section>
  );
}

export default MyProfile;
