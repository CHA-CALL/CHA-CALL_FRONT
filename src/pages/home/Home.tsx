import { useState } from 'react';
import Tooltip from '@shared/components/tooltip/Tooltip';

const Home = () => {
  const [isTooltip1Open, setIsTooltip1Open] = useState(true);
  const [isTooltip2Open, setIsTooltip2Open] = useState(true);

  const handleCloseTooltip1 = () => {
    setIsTooltip1Open(false);
  };
  const handleCloseTooltip2 = () => {
    setIsTooltip2Open(false);
  };

  return (
    <div className='p-[2rem]'>
      <div className='flex flex-row justify-between'>
        <div className='relative'>
          <div className='h-[3rem] w-[3rem] border border-grayscale-200 rounded-[0.4rem]'>
            툴팁 기준점
          </div>
          <Tooltip
            isTooltipOpen={isTooltip1Open}
            text='맞춤조건을 설정해보세요'
            handleCloseTooltip={handleCloseTooltip1}
            positionOffsetY={2.5}
            positionOffsetX={-0.5}
            horizontalAlign='left'
          />
        </div>
        <div className='w-[25rem] border border-grayscale-200 rounded-[0.4rem]'>
          다른 요소
        </div>
      </div>

      <div className='flex flex-row justify-between mt-[10rem]'>
        <div className='w-[25rem] border border-grayscale-200 rounded-[0.4rem]'>
          다른 요소
        </div>
        <div className='relative'>
          <div className='h-[3rem] w-[3rem] border border-grayscale-200 rounded-[0.4rem]'>
            툴팁 기준점
          </div>
          <Tooltip
            isTooltipOpen={isTooltip2Open}
            text='맞춤조건을 설정할 수 있어요'
            handleCloseTooltip={handleCloseTooltip2}
            positionOffsetY={-3.5}
            positionOffsetX={-0.5}
            horizontalAlign='right'
            verticalAlign='up'
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
