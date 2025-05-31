'use client';

import { ChangeEvent, useState } from 'react';
import cn from '@/shared/lib/utils';

export default function VendorDropInput({ title }: { title: string }) {
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (newFile: File | null) => {
    setFile(newFile);
  };

  // 드래그 중인 요소가 목표 지점 진입할때
  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  // 드래그 중인 요소가 목표 지점을 벗어날때
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  // 드래그 중인 요소가 목표 지점에 위치할때
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // 드래그 중인 요소가 목표 지점에서 드롭될때
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    if (e.dataTransfer) {
      const newFile = e.dataTransfer.files[0];
      handleFileSelect(newFile);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files ? e.target.files[0] : null;
    handleFileSelect(newFile);
    e.target.value = '';
  };

  return (
    <label
      className={cn(
        'bg-vendor-gray flex h-[165px] w-[219px] cursor-pointer flex-col items-center justify-center rounded-md',
        dragOver && 'bg-[#404040]',
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <span className="text-5xl">+</span>
      <span>{title}</span>
      <span className="text-xs text-[#BDBDBD]">(최대 1개)</span>
      <input type="file" className="hidden" onChange={handleChange} />
      <span>{file?.name}</span>
    </label>
  );
}
