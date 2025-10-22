import Image from 'next/image';

function LoginThirdLeftSection() {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-white pt-5">
      <h1 className="text-3xl font-bold">
        <span className="text-3xl text-[#4f7df9]">SOLU</span>는 검증된 비지니스
        도구만을
        <br />
        여러분께 보여드립니다.
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
