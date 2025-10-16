export const convertURLtoFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();
  const ext = data.type.split('/')[1] || 'jpg';
  const filename = url.split('/').pop() || `image.${ext}`;
  const metadata = { type: data.type };

  return new File([data], filename, metadata);
};
