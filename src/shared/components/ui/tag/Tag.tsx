interface TagProps {
  title: string;
}

export default function Tag({ title }: TagProps) {
  return (
    <div className='inline-block w-fit whitespace-nowrap rounded-[0.6rem] bg-primary-50 px-[1.2rem] py-[0.2rem] leading-[1.5rem] text-primary-700 caption-m-10'>
      {title}
    </div>
  );
}
