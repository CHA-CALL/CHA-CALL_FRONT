export const convertURLtoFile = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`이미지 요청 실패: ${response.status} ${response.statusText}`);
  }
  const data = await response.blob();
  const ext = data.type.split('/')[1] || 'jpg';
  const filename = url.split('/').pop() || `image.${ext}`;
  const metadata = { type: data.type };

  return new File([data], filename, metadata);
};
