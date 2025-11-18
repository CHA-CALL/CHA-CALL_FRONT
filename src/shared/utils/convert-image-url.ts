export const convertURLtoFile = async (url: string) => {
  // TODO: 삭제 및 url로 수정 (이미지 수정 테스트용)
  const newUrl = new URL(url);
  const proxiedUrl = `/image-proxy${newUrl.pathname}${newUrl.search}`;

  const response = await fetch(proxiedUrl);
  if (!response.ok) {
    throw new Error(`이미지 요청 실패: ${response.status} ${response.statusText}`);
  }
  const data = await response.blob();
  const ext = data.type.split('/')[1] || 'jpg';
  const filename = url.split('/').pop() || `image.${ext}`;
  const metadata = { type: data.type };

  return new File([data], filename, metadata);
};
