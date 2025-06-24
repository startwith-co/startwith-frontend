'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { DropdownProps } from '@/shared/model/type';
import cn from '@/shared/lib/utils';
import logoutAction from '@/shared/api/logoutAction';
import { useRouter } from 'next/navigation';

export default function Dropdown({
  buttonText,
  items,
  buttonClassName = '',
  menuClassName = '',
  divClassName = '',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={cn('relative inline-block', divClassName)}
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 rounded-md text-sm font-bold ${buttonClassName}`}
      >
        {buttonText}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute left-1/2 z-10 mt-2 min-w-22 -translate-x-1/2 transform rounded-md bg-white shadow-lg ${menuClassName}`}
        >
          <div className="py-1">
            {items.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  router.push(item.href || '');
                  setIsOpen(false);
                }}
                className="w-full px-2 py-2 text-center text-sm text-gray-700 hover:bg-gray-100"
              >
                {item.label}
              </button>
            ))}
            <button
              className="w-full px-2 py-2 text-center text-sm text-red-500 hover:bg-gray-100"
              onClick={async () => {
                await logoutAction();
                setIsOpen(false);
              }}
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
