import { cn } from '@shared/utils/cn';

const SharedClass =
  'basis-0 grow-[106] min-w-0 flex justify-center items-center py-[1.1rem]';

export default function LocationCategoryLabels() {
  return (
    <div className='flex w-full gap-[0.3rem] border-b-1 border-grayscale-200 title-sb-12 text-grayscale-900 '>
      <div className={cn(SharedClass)}>시 • 도</div>
      <div className={cn(SharedClass)}>시 • 군 • 구</div>
      <div className={cn(SharedClass)}>동 • 읍 • 면</div>
    </div>
  );
}
