interface TitleProps {
  title: string;
  maxLength?: number;
  currentLength?: number;
}

export default function SectionTitle({
  title,
  maxLength,
  currentLength,
}: TitleProps) {
  return (
    <div className='flex w-full items-center justify-between'>
      <p className='text-grayscale-900 title-sb-14'>{title}</p>
      {maxLength && (
        <div className='flex items-center gap-[1rem] text-grayscale-500 caption-m-12'>
          <span className='text-primary-700'>{currentLength}</span>
          <span>/</span>
          <span>{maxLength}</span>
        </div>
      )}
    </div>
  );
}
