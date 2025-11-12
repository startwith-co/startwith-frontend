'use client';

import { ChangeEvent, useState } from 'react';
import cn from '@/shared/lib/utils';

interface VendorDropInputProps {
  title: string;
  accept?: string[]; // 배열로 받음
  onChange: (file: File | null) => void;
  className?: string;
}

export default function VendorDropInput({
  title,
  accept,
  onChange,
  className,
}: VendorDropInputProps) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const isAcceptedFile = (newFile: File) => {
    if (!accept) return true;
    return accept.some((type) => {
      if (type.startsWith('.')) return newFile.name.endsWith(type);
      if (type.endsWith('/*'))
        return newFile.type.startsWith(type.replace('/*', ''));
      return newFile.type === type;
    });
  };

  const handleFileSelect = (newFile: File | null) => {
    if (newFile && !isAcceptedFile(newFile)) {
      alert('허용되지 않는 파일 형식입니다.');
    }
    setFile(newFile);
    onChange(newFile);
  };

  const handleDrag = (
    e: React.DragEvent<HTMLLabelElement>,
    isOver: boolean,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(isOver);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const newFile = e.dataTransfer?.files[0];
    handleFileSelect(newFile ?? null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0] ?? null;
    handleFileSelect(newFile);
    e.target.value = '';
  };

  return (
    <label
      className={cn(
        'bg-vendor-gray flex cursor-pointer flex-col items-center justify-center rounded-md',
        dragOver && 'bg-[#404040]',
        className,
      )}
      onDragEnter={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDragOver={(e) => handleDrag(e, true)}
      onDrop={handleDrop}
    >
      <span className="text-5xl">+</span>
      <span>{title}</span>
      <span className="mt-1 text-xs text-[#BDBDBD]">
        최대 스펙 : 1920(가로)*380(세로)
      </span>
      <span className="text-xs text-[#BDBDBD]">
        5대1 비율의 이미지 등록 시 최적화됩니다.
      </span>
      <input
        type="file"
        className="hidden"
        accept={accept?.join(',')}
        onChange={handleChange}
      />
      <span>{file?.name}</span>
    </label>
  );
}
