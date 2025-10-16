import ConsumerProfileSide from '@/entities/my/ui/consumer-profile-side';
import getConsumerInfo from '@/features/my/api/getConsumerInfo';

interface Route {
  label: string;
  href: string;
}

interface ConsumerProfileSideProps {
  routes: Route[];
  id: number;
}
async function ConsumerProfile({ routes, id }: ConsumerProfileSideProps) {
  const userInfo = await getConsumerInfo(id);

  return <ConsumerProfileSide routes={routes} userInfo={userInfo.data} />;
}

export default ConsumerProfile;
