const SharedClass = 'flex justify-center items-center py-[1.1rem]';

export default function DepthTitle() {
  return (
    <nav className='border-b-1 border-grayscale-200 title-sb-12 text-grayscale-900 grid w-full grid-cols-[1fr_1fr_1fr] gap-[0.3rem]'>
      <nav className={SharedClass}>시 • 도</nav>
      <nav className={SharedClass}>시 • 군 • 구</nav>
      <nav className={SharedClass}>동 • 읍 • 면</nav>
    </nav>
  );
}
