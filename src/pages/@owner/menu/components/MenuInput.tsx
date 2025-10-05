import ErrorText from '@components/error-text/ErrorText';

interface MenuInputProps {
  title: string;
  error?: string;
  children: React.ReactNode;
}

export default function MenuInput({ title, error, children }: MenuInputProps) {
  return (
    <div className='flex flex-col gap-[1rem]'>
      <span className='title-sb-14 text-grayscale-900'>{title}</span>
      {children}
      {error && <ErrorText text={error} />}
    </div>
  );
}
