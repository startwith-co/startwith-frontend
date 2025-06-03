'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

interface VendorSelectProps {
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}

export default function VendorSelect({
  onChange,
  options,
  placeholder,
}: VendorSelectProps) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="bg-vendor-gray h-12 w-full rounded-lg text-xs font-medium shadow">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-vendor-gray rounded-xl shadow-lg">
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}
            className="hover:bg-vendor-secondary h-10 cursor-pointer justify-center text-sm"
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
