import EditInfo from '@/features/my/ui/edit-info';
import Image from 'next/image';

function MyProfile() {
  return (
    <section>
      <h1 className="mb-3 text-2xl font-bold">내 정보</h1>
      <div className="relative mb-40 rounded-xl bg-white p-8 shadow-md">
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
        <EditInfo />
      </div>
    </section>
  );
}

export default MyProfile;
