'use client';

import Input from '@/shared/ui/input';
import { MdOutlineAttachFile } from 'react-icons/md';
import Image from 'next/image';
import { FormEvent } from 'react';
import { X } from 'lucide-react';
import cn from '../lib/utils';
import { FileItem } from '../model/chat-type';

interface ChattingInputProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  message: string;
  setMessage: (message: string) => void;
  attachedFile: FileItem | null;
  filePreviewUrl: string | null;
  consumerSeq: string;
  vendorSeq: string;
  buttonProps?: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileRemove: () => void;
  imageFileRef: React.RefObject<HTMLInputElement | null>;
}

function ChattingInput({
  handleSubmit,
  message,
  setMessage,
  attachedFile,
  filePreviewUrl,
  consumerSeq,
  vendorSeq,
  handleFileChange,
  handleFileRemove,
  imageFileRef,
  buttonProps,
}: ChattingInputProps) {
  return (
    <form onSubmit={handleSubmit} className="bg-none p-4">
      <div className="w-full rounded-3xl border border-gray-300 bg-white px-4 py-3">
        {attachedFile && (
          <div className="relative mb-2 inline-block">
            {filePreviewUrl ? (
              <Image
                src={filePreviewUrl}
                alt="preview"
                width={60}
                height={60}
                className="rounded"
              />
            ) : (
              <div className="max-w-[95%] truncate rounded bg-gray-100 px-2 py-1 text-sm text-gray-500">
                {attachedFile.fileName}
              </div>
            )}

            <button
              type="button"
              onClick={handleFileRemove}
              className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-white"
            >
              <X size={12} />
            </button>
          </div>
        )}

        <div className="relative flex items-center">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지 입력"
            className="w-full border-none bg-transparent py-2 pr-20 pl-2 shadow-none placeholder:font-light focus:ring-0"
          />

          <label htmlFor="file-input">
            <MdOutlineAttachFile className="absolute top-1/2 right-10 size-5.5 -translate-y-1/2 cursor-pointer text-gray-500" />
          </label>
          <input
            id="file-input"
            ref={imageFileRef}
            type="file"
            className="hidden"
            accept="image/*, .pdf"
            onChange={handleFileChange}
          />
          <button
            disabled={!consumerSeq || !vendorSeq}
            type="submit"
            className={cn(
              'absolute top-1/2 right-2 flex size-[30px] -translate-y-1/2 items-center justify-center rounded-full bg-blue-500 text-white',
              buttonProps,
            )}
          >
            →
          </button>
        </div>
      </div>
    </form>
  );
}

export default ChattingInput;
