import { useState } from 'react';
import getFileRequest from '../api/getFileRequest';

function useFileClick(uuid: string) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileClick = async () => {
    if (!fileUrl) {
      try {
        const data = await getFileRequest({ chatUniqueType: uuid });
        setFileUrl(data?.fileUrl);
        window.open(data?.fileUrl, '_blank');
      } catch (err) {
        alert('파일을 불러오지 못했습니다.\n(20mb 이하 파일만 가능합니다.)');
      }
    } else {
      window.open(fileUrl, '_blank');
    }
  };
  return {
    handleFileClick,
    fileUrl,
  };
}

export default useFileClick;
