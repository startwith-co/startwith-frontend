import api from '@/shared/api/client-api';
import { ApiResponse } from '@/shared/model/apiType';
import { FileRequestProps } from '../model/type';

export default async function getFileRequest({
  chatUniqueType,
}: {
  chatUniqueType: string;
}) {
  const res = await api
    .get<
      ApiResponse<FileRequestProps>
    >(`api/b2b-service/chat?chatUniqueType=${chatUniqueType}`)
    .json();

  return res.data;
}
