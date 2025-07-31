'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import cn from '../lib/utils';

interface VendorSelectProps {
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  triggerClassName?: string;
  itemsClassName?: string;
}

export default function VendorSelect({
  onChange,
  options,
  placeholder,
  triggerClassName,
  itemsClassName,
}: VendorSelectProps) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          'bg-vendor-gray h-12 w-full rounded-lg text-xs font-medium',
          triggerClassName,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-vendor-gray rounded-xl">
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}
            className={cn(
              'hover:bg-vendor-secondary cursor-pointer text-left text-sm leading-5',
              itemsClassName,
            )}
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
