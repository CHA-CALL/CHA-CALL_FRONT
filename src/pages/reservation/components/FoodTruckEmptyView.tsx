export default function FoodTruckEmptyView() {
  return (
    <div className='pointer-events-none absolute top-[0rem] flex min-h-[100dvh] w-full flex-col items-center justify-center gap-[1.6rem] pt-[6.6rem] fixed-center'>
      <img src='https://placehold.co/140' />
      <span className='text-center text-grayscale-500 body-m-14'>
        조건에 맞는 푸드트럭이 없습니다.
      </span>
    </div>
  );
}
