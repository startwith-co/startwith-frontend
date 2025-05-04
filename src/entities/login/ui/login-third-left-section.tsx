import Image from 'next/image';

function LoginThirdLeftSection() {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-white pt-5">
      <h1 className="text-3xl font-bold">
        <span className="text-3xl text-[#4f7df9]">SOLU</span>는 검증된 기업
        솔루션만
        <br />
        <span className="font-extrabold">‘선별하여 제안’</span>합니다
      </h1>
      <Image
        src="/images/login-third.png"
        width={400}
        height={500}
        alt="login-third-left"
      />
    </section>
  );
}

export default LoginThirdLeftSection;
