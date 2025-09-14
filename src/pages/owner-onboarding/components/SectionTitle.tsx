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
      <p className='title-sb-14 text-grayscale-900'>{title}</p>
      {maxLength && (
        <div className='caption-m-12 text-grayscale-500 flex items-center gap-[1rem]'>
          <span className='text-primary-700'>{currentLength}</span>
          <span>/</span>
          <span>{maxLength}</span>
        </div>
      )}
    </div>
  );
}
