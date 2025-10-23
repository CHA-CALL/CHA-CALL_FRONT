import Navigation from '@shared/components/navigation/Navigation';
import { Icon } from '@shared/components/icon/Icon';
import { mockup } from '@pages/save-food-truck-list/mockup';
import ButtonFloating from '@shared/components/button-floating/ButtonFloating';
import { useNavigate } from 'react-router-dom';
import FoodTruckCard from '@shared/components/food-truck-card/FoodTruckCard';

export default function SaveFoodTruckList() {
  const data = mockup;
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(-1);
  };

  const handleClickCard = () => {};

  const handleClickButton = () => {};

  return (
    <>
      <Navigation
        text='저장한 푸드트럭'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <div className='flex flex-col gap-[1rem] p-[2rem]'>
        <p className='caption-m-12 text-grayscale-500'>총 {data.length}개</p>
        <div className='flex flex-col gap-[4rem]'>
          {data.map(item => (
            <>
              <FoodTruckCard
                key={item.foodTruckId}
                variant='foodtruckClient'
                data={item}
                handleClickCard={handleClickCard}
                handleClickButton={handleClickButton}
              />
            </>
          ))}
        </div>
      </div>
      <ButtonFloating />
    </>
  );
}
