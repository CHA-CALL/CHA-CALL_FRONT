import React, { useEffect, useState } from 'react';

export default function SearchMenuEmptyView() {
  const [emptyViewRenderer, setEmptyViewRenderer] = useState<React.ReactNode>(
    <></>
  );

  useEffect(() => {
    const emptyViewTimer = setTimeout(() => {
      setEmptyViewRenderer(
        <div className='pointer-events-none absolute top-[0rem] flex min-h-[100dvh] w-full flex-col items-center justify-center gap-[1.6rem] pt-[6.6rem] fixed-center'>
          <img src='https://placehold.co/140' alt='' />
          <span className='text-center text-grayscale-500 body-m-14'>
            검색어와 일치하는 검색 결과가 없습니다.
          </span>
        </div>
      );
    }, 600);

    return () => clearTimeout(emptyViewTimer);
  }, []);

  return emptyViewRenderer;
}
