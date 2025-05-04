'use client';

import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import LoginModal from './login-modal';

function LoginControl() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-t from-[#F4F8FF] to-[#DBE8FF]">
      <div className="space-y-6">
        <h1 className="mb-3 text-4xl font-bold text-[#6E86FF]">SOLU</h1>
        <h1 className="text-3xl font-extrabold text-[#2b2b2b]">
          검증된 프리미엄 기업 솔루션,
          <br />
          이제 SOLU에서 찾아보세요
        </h1>

        <p className="text-sm text-gray-500">
          지금 귀사에 꼭 맞는 ERP, CRM, HRM 솔루션을 찾아보세요.
        </p>
        <div>
          <Button
            onClick={() => setOpen(true)}
            asChild={false}
            variant="login"
            className="h-[50px] w-full rounded-sm bg-gradient-to-t from-[#6E86FF] to-[#5B76FF] text-white shadow-md"
          >
            로그인
          </Button>

          <div className="grid w-full grid-cols-2 gap-2 pt-4">
            <Button
              asChild
              variant="login"
              className="h-[50px] w-full rounded-sm bg-[#2D2D2D] text-white shadow-md"
            >
              <Link href="signup/vendor">
                <span className="text-sm font-semibold">벤더로 회원가입</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="login"
              className="h-[50px] w-full rounded-sm border border-gray-200 bg-white text-[#4f7df9] shadow-md"
            >
              <Link href="signup/user">
                <span className="text-sm font-semibold">
                  기업 고객으로 회원가입
                </span>
              </Link>
            </Button>
          </div>
        </div>

        <LoginModal open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

export default LoginControl;
