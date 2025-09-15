import { cn } from '@shared/utils/cn';

const SharedClass = 'flex justify-center items-center py-[1.1rem]';

export default function LocationCategoryLabels() {
  return (
    <div className='grid grid-cols-[106fr_135fr_134fr] w-full gap-[0.3rem] border-b-1 border-grayscale-200 title-sb-12 text-grayscale-900 '>
      <div className={cn(SharedClass)}>시 • 도</div>
      <div className={cn(SharedClass)}>시 • 군 • 구</div>
      <div className={cn(SharedClass)}>동 • 읍 • 면</div>
    </div>
  );
}
