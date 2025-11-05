export default function FoodTruckOptionSection({ option }: { option: string }) {
  return (
    <div className='p-[2rem]'>
      <div className='flex flex-col gap-[0.8rem]'>
        <h3 className='text-grayscale-900 title-sb-12'>기타 옵션</h3>
        <span className='whitespace-pre-line text-grayscale-700 caption-m-12'>
          {option}
        </span>
      </div>
    </div>
  );
}
