import EditVendorInfo from '@/features/vendorMy/ui/edit-vendor-info';
import Image from 'next/image';
import EditVendorTextArea from '@/features/vendorMy/ui/edit-vendor-text-area';

function VendorMyProfile() {
  return (
    <section className="grid w-full grid-cols-[1.3fr_1fr] pr-8">
      <div className="relative rounded-xl border-2 border-[#404040] bg-[#212121] p-8 shadow-md">
        <Image
          src="/images/profileAdd.png"
          alt="image"
          width={100}
          height={100}
          className="mb-7"
        />
        <Image
          src="/images/add.png"
          alt="image"
          width={20}
          height={20}
          className="absolute top-27 left-25 z-10"
        />
        <EditVendorInfo />
      </div>
      <EditVendorTextArea />
    </section>
  );
}

export default VendorMyProfile;
