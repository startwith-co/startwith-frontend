'use client';

import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import Link from 'next/link';
import LoginModal from './login-modal';

function LoginButtonSection() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div>
        <Button
          type="button"
          onClick={() => setOpen(true)}
          asChild={false}
          variant="bgBlueGradient"
          className="h-[50px] w-full shadow-md"
        >
          로그인
        </Button>

        <div className="grid w-full grid-cols-2 gap-2 pt-4">
          <Button
            type="button"
            asChild
            variant="bgBlackGradient"
            className="h-[50px] w-full shadow-md"
          >
            <Link href="signup/vendor">
              <span className="text-sm font-semibold">벤더로 회원가입</span>
            </Link>
          </Button>

          <Button
            type="button"
            asChild
            variant="textBlue"
            className="h-[50px] w-full shadow-md"
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
    </>
  );
}

export default LoginButtonSection;
