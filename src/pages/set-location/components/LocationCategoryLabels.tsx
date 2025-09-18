import { cn } from '@shared/utils/cn';

const SharedClass = 'flex justify-center items-center py-[1.1rem]';

export default function LocationCategoryLabels() {
  return (
    <nav className='border-b-1 border-grayscale-200 title-sb-12 text-grayscale-900 grid w-full grid-cols-[106fr_135fr_134fr] gap-[0.3rem]'>
      <nav className={cn(SharedClass)}>시 • 도</nav>
      <nav className={cn(SharedClass)}>시 • 군 • 구</nav>
      <nav className={cn(SharedClass)}>동 • 읍 • 면</nav>
    </nav>
  );
}
