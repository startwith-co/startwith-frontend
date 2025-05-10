import { useState, useRef } from 'react';

function useFileUpload() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleClickFileInput = () => {
    fileInputRef.current?.click();
  };

  return {
    preview,
    file,
    fileInputRef,
    handleFileChange,
    handleClickFileInput,
  };
}

export default useFileUpload;
