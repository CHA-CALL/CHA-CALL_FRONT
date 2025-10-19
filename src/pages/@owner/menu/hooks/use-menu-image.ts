import { useMutation } from '@tanstack/react-query';
import { getPresignedUrl } from '@pages/@owner/menu/api';

export const useMenuImage = () => {
  return useMutation({
    mutationFn: (fileExtension: string) => getPresignedUrl(fileExtension),
  });
};
