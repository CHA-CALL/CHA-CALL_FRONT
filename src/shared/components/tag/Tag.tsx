interface TagProps {
  title: string;
}

export default function Tag({ title }: TagProps) {
  return (
    <div className='bg-primary-50 text-primary-700 caption-m-10 inline-block whitespace-nowrap rounded-[0.6rem] px-[1.2rem] py-[0.2rem] leading-[1.5rem]'>
      {title}
    </div>
  );
}
