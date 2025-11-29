import Link from 'next/link';
import { FiMail } from 'react-icons/fi';
import Image from 'next/image';
import cn from '@/shared/lib/utils';
import { auth } from '@/auth';
import { Button } from './button';
import Dropdown from './dropdown';

interface HeaderProps {
  className?: string;
}

export default async function Header({ className }: HeaderProps) {
  const session = await auth();

  return (
    <header
      className={cn(
        'flex items-center justify-between bg-transparent px-4 pt-[35px] sm:px-8 md:px-16 lg:px-32 2xl:px-[300px]',
        className,
      )}
    >
      <div className="flex items-center gap-8">
        <Link href="/" className="flex flex-row items-center gap-2">
          <Image
            src="/images/instrument.svg"
            alt="instrument"
            width={30}
            height={30}
          />
          <span className="font-bold">Instrumer</span>
        </Link>
      </div>

      <div className="flex items-center gap-3.5 text-[12px]">
        {session?.role === 'vendor' && (
          <Link href="/vendor">
            <Button
              asChild={false}
              variant="vendor"
              className="h-7 text-[12px]"
            >
              밴더 전용 HOME
            </Button>
          </Link>
        )}

        {session?.name ? (
          <>
            <Link
              href={
                session?.role === 'vendor'
                  ? `/vendor/chat?vendorId=${session.vendorSeq}`
                  : `/chat?consumerId=${session?.consumerSeq}`
              }
            >
              <FiMail size={24} />
            </Link>
            <Dropdown
              buttonText={session?.name || 'user'}
              items={[
                {
                  label: '내 정보',
                  href:
                    session?.role === 'vendor'
                      ? '/vendor/my/profile'
                      : '/my/profile',
                },
              ]}
              isLoginHeaderOption
            />
          </>
        ) : (
          <Link href="/login" className="font-bold">
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
