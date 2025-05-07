import Image from 'next/image';

function LoginSecondSection() {
  return (
    <section className="flex h-screen w-screen flex-col items-center justify-center gap-5 bg-gradient-to-b from-[#F0F8FF] to-[white] pt-5">
      <h1 className="text-3xl font-bold">
        아직도 수십 개의 솔루션을 직접 비교하고 계신가요?
      </h1>
      <Image
        src="/images/login-second.png"
        width={670}
        height={600}
        alt="login-second"
      />
    </section>
  );
}

export default LoginSecondSection;
