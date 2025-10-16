import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import VendorProfileSideHeader from '@/entities/my/ui/vendor-profile-side';
import VendorRouteSide from '@/features/vendorMy/ui/vendor-route-side';
import getVendorProfile from '@/features/vendorMy/api/getVendorProfile';
import { auth } from '@/auth';

interface Route {
  label: string;
  href: string;
}

interface VendorProfileSideProps {
  routes: Route[];
}

export default async function VendorProfileSide({
  routes,
}: VendorProfileSideProps) {
  const session = await auth();
  const res = await getVendorProfile(session?.vendorSeq || 0);
  console.log('res.data', res);

  const vendorInfo = res.data;

  return (
    <aside className="bg-vendor-primary .5 relative mr-3 ml-3 flex h-[650px] flex-col items-center rounded-2xl px-6 py-9 shadow-md">
      <VendorProfileSideHeader audit={vendorInfo?.audit || false} />

      <Avatar className="mb-2.5 flex size-30 rounded-full">
        <AvatarImage
          src={vendorInfo?.profileImage || '/images/default-profile.svg'}
        />
        <AvatarFallback>스타트윗</AvatarFallback>
      </Avatar>

      <h1 className="mb-14.5 text-lg font-semibold text-white">
        {vendorInfo?.vendorName}
      </h1>

      <VendorRouteSide routes={routes} />
    </aside>
  );
}
