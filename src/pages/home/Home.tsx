import { useState } from 'react';
import Tooltip from '@shared/components/tooltip/Tooltip';

const Home = () => {
  const [isTooltip1Visible, setIsTooltip1Visible] = useState(true);
  const [isTooltip2Visible, setIsTooltip2Visible] = useState(true);

  const handleCloseTooltip1 = () => {
    setIsTooltip1Visible(false);
  };
  const handleCloseTooltip2 = () => {
    setIsTooltip2Visible(false);
  };

  return (
    <div className='p-[2rem]'>
      <div className='flex flex-row justify-between'>
        <div className='relative'>
          <div className='h-[3rem] w-[3rem] rounded-[0.4rem] border border-grayscale-200'>
            툴팁 기준점
          </div>
          <Tooltip
            isTooltipVisible={isTooltip1Visible}
            text='맞춤조건을 설정해보세요'
            handleCloseTooltip={handleCloseTooltip1}
            positionOffsetY={2.5}
            positionOffsetX={-0.5}
            horizontalAlign='left'
          />
        </div>
        <div className='w-[25rem] rounded-[0.4rem] border border-grayscale-200'>
          다른 요소
        </div>
      </div>

      <div className='mt-[10rem] flex flex-row justify-between'>
        <div className='w-[25rem] rounded-[0.4rem] border border-grayscale-200'>
          다른 요소
        </div>
        <div className='relative'>
          <div className='h-[3rem] w-[3rem] rounded-[0.4rem] border border-grayscale-200'>
            툴팁 기준점
          </div>
          <Tooltip
            isTooltipVisible={isTooltip2Visible}
            text='맞춤조건을 설정할 수 있어요'
            handleCloseTooltip={handleCloseTooltip2}
            positionOffsetY={-3.5}
            positionOffsetX={-0.5}
            horizontalAlign='right'
            verticalAlign='top'
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
