'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiMail } from 'react-icons/fi';
import { IoSearchOutline } from 'react-icons/io5';
import useCurrentSession from '@/shared/model/useCurrentSession';
import { ApiResponse } from '@/shared/model/apiType';
import {
  ConsumerInfoProps,
  VendorInfoProps,
} from '@/views/vendorMy/model/type';
import cn from '@/shared/lib/utils';
import { signOut } from 'next-auth/react';
import Input from './input';
import { Button } from './button';
import Dropdown from './dropdown';
import api from '../api/client-api';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const { session, status } = useCurrentSession();
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useLayoutEffect(() => {
    const fetchData = async () => {
      if (status === 'loading' || !session) return;
      if (!session.uniqueType) {
        signOut();
        return;
      }
      if (session.role === 'consumer' && !session.consumerSeq) {
        signOut();
      }
      if (session.role === 'vendor' && !session.vendorSeq) {
        signOut();
      }
      if (session.role === 'vendor') {
        const res = await api
          .get(`api/b2b-service/vendor?vendorSeq=${session.vendorSeq}`)
          .json<ApiResponse<VendorInfoProps>>();
        setName(res.data.vendorName || 'user');
      } else {
        const res = await api
          .get(`api/b2b-service/consumer?consumerSeq=${session.consumerSeq}`)
          .json<ApiResponse<ConsumerInfoProps>>();
        setName(res.data.consumerName || 'user');
      }
    };
    fetchData();
  }, [session, status]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keyword = inputRef.current?.value.trim();
    if (keyword) {
      router.push(`/search?keyword=${keyword}`);
    }
  };

  return (
    <header
      className={cn(
        'flex items-center justify-between bg-transparent px-4 pt-[35px] sm:px-8 md:px-16 lg:px-32 2xl:px-[300px]',
        className,
      )}
    >
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-primary text-3xl font-bold">SOLU</h1>
        </Link>

        <form onSubmit={handleSearch} className="relative">
          <IoSearchOutline
            size={20}
            className="absolute top-1/2 left-3 -translate-y-1/2 transform"
          />
          <Input
            ref={inputRef}
            type="search"
            placeholder="키워드를 검색해주세요."
            className="h-[45px] w-[420px] rounded-3xl bg-white pl-10 text-black shadow-sm placeholder:text-black"
          />
          <button
            type="submit"
            className="absolute top-1/2 right-3 flex size-[30px] -translate-y-1/2 transform items-center justify-center rounded-full bg-black p-1 text-center text-white"
          >
            →
          </button>
        </form>
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
        {/* <Button asChild={false} variant="ghost" className="h-7 text-[12px]">
          <PiGlobe />
          <span className="font-normal">Language</span>
        </Button> */}
        {/* <FiBell size={24} href="/notification"/> */}
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
          buttonText={name || session?.name || 'user'}
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
      </div>
    </header>
  );
}
