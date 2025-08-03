import Footer from '@/shared/ui/footer';
import Header from '@/shared/ui/header';
import ProfileSide from '@/shared/ui/profile-side';
import { auth } from '@/auth';
import serverApi from '@/shared/api/server-api';
import { ApiResponse } from '@/shared/model/apiType';
import { ConsumerInfoProps } from '@/views/vendorMy/model/type';

const routes = [
  { label: '상세 정보', href: '/my/detail' },
  { label: '내 정보', href: '/my/profile' },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const res = await serverApi
    .get(`api/b2b-service/consumer?consumerSeq=${session?.consumerSeq}`)
    .json<ApiResponse<ConsumerInfoProps>>();

  return (
    <>
      <Header />
      <div className="flex w-screen justify-center overflow-y-scroll bg-[rgba(250,252,255,1)]">
        <main className="mt-20 mb-10 flex flex-row justify-center">
          <ProfileSide
            routes={routes}
            companyName={res.data.consumerName}
            imageUrl={res.data.consumerImageUrl}
          />
          <div className="flex grow">{children}</div>
        </main>
      </div>
      <Footer />
    </>
  );
}
