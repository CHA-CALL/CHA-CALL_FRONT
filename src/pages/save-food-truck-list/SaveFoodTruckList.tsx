import Navigation from '@shared/components/layout/navigation/Navigation';
import { Icon } from '@shared/components/icon/Icon';
import { mockup } from '@pages/save-food-truck-list/mockup';
import { cn } from '@shared/utils/cn';
import ButtonFloating from '@shared/components/ui/button-floating/ButtonFloating';
import { useNavigate } from 'react-router-dom';

export default function SaveFoodTruckList() {
  const data = mockup;
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Navigation
        text='저장한 푸드트럭'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <div className='flex flex-col gap-[1rem] p-[2rem]'>
        <p className='caption-m-12 text-grayscale-500'>총 {data.length}개</p>
        <div>
          {data.map((item, index) => (
            <div key={`${item.title}-${index}`}>
              <div className={cn('mb-[2rem]', index !== 0 && 'mt-[2rem]')}>
                <p>{item.title}</p>
              </div>
              {index !== data.length - 1 && (
                <div className='bg-grayscale-100 h-[0.1rem] w-full' />
              )}
            </div>
          ))}
        </div>
      </div>
      <ButtonFloating />
    </>
  );
}
