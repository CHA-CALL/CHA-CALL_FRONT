interface TagProps{
    title:string;
}

export const Tag = ({title}:TagProps) => {
  return <div className="inline-block px-[1.2rem] py-[0.2rem] bg-primary-50 text-primary-700 caption-m-10 rounded-[0.6rem] leading-[1.5rem]">{title}</div>;
};
