'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import cn from '@/shared/lib/utils';

interface VendorDropInputProps {
  title: string;
  accept?: string[];
  onChange: (file: File | null) => void;
  value?: File | null;
  className?: string;
}

export default function VendorDropInput({
  title,
  accept,
  onChange,
  value = null,
  className,
}: VendorDropInputProps) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(value);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (value instanceof File) {
      setFile(value);
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [value]);

  const handleFileSelect = (newFile: File | null) => {
    if (newFile) {
      const url = URL.createObjectURL(newFile);
      setPreviewUrl(url);
      setFile(newFile);
      onChange(newFile);
    } else {
      setPreviewUrl(null);
      setFile(null);
      onChange(null);
    }
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
    setDragOver(false);
    const newFile = e.dataTransfer?.files?.[0] ?? null;
    handleFileSelect(newFile);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0] ?? null;
    handleFileSelect(newFile);
    e.target.value = '';
  };

  const isImage = file?.type.startsWith('image/');

  return (
    <label
      className={cn(
        'bg-vendor-gray relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md',
        dragOver && 'bg-[#404040]',
        className,
      )}
      onDragEnter={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDragOver={(e) => handleDrag(e, true)}
      onDrop={handleDrop}
    >
      {previewUrl && isImage && (
        <img
          src={previewUrl}
          alt="preview"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {!previewUrl && (
        <>
          <span className="text-5xl">+</span>
          <span>{title}</span>
          <span className="mt-1 text-xs text-[#BDBDBD]">
            최대 스펙 : 1920(가로)*380(세로)
          </span>
          <span className="text-xs text-[#BDBDBD]">
            5대1 비율의 이미지 등록 시 최적화됩니다.
          </span>
        </>
      )}

      <input
        type="file"
        className="hidden"
        accept={accept?.join(',')}
        onChange={handleChange}
      />

      {file && (
        <span className="absolute bottom-2 left-2 rounded bg-black/50 px-2 text-xs text-white">
          {file.name}
        </span>
      )}
    </label>
  );
}
