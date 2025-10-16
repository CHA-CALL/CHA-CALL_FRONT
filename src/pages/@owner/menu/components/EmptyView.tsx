export default function EmptyView() {
  return (
    <div className='flex flex-col items-center justify-center pt-[11.9rem]'>
      <img
        src='https://placehold.co/140'
        alt='No Menu Items'
        className='mb-[1.6rem] mt-[50%] h-[14rem] w-[14rem] object-cover'
      />
      <span className='text-grayscale-500 body-m-14'>
        등록된 메뉴가 없습니다.
      </span>
    </div>
  );
}
