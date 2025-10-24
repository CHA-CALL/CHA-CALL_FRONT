import Navigation from '@shared/components/navigation/Navigation';
import { Icon } from '@shared/components/icon/Icon';
import ButtonFloating from '@shared/components/button-floating/ButtonFloating';
import { useNavigate } from 'react-router-dom';
import FoodTruckCard from '@shared/components/food-truck-card/FoodTruckCard';
import { useGetSaveFoodTrucks } from '@pages/save-food-truck-list/hooks/use-save-food-truck';
import Loading from '@shared/components/loading/Loading';

export default function SaveFoodTruckList() {
  const { data, isPending } = useGetSaveFoodTrucks();
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(-1);
  };

  const handleClickCard = () => {};

  const handleClickButton = () => {};

  if (isPending || !data) {
    return <Loading />;
  }

  return (
    <>
      <Navigation
        text='저장한 푸드트럭'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <div className='flex flex-col gap-[1rem] p-[2rem]'>
        <p className='caption-m-12 text-grayscale-500'>
          총 {data.foodTrucks.length}개
        </p>
        <div className='flex flex-col gap-[4rem]'>
          {(data.foodTrucks ?? []).map(item => (
            <>
              {item && (
                <FoodTruckCard
                  key={item?.foodTruckId}
                  variant='foodtruckClient'
                  data={item}
                  handleClickCard={handleClickCard}
                  handleClickButton={handleClickButton}
                />
              )}
            </>
          ))}
        </div>
      </div>
      <ButtonFloating />
    </>
  );
}
