import Navigation from '@shared/components/navigation/Navigation';
import { Icon } from '@shared/components/icon/Icon';
import ButtonFloating from '@shared/components/button-floating/ButtonFloating';
import { useNavigate } from 'react-router-dom';
import FoodTruckCard from '@shared/components/food-truck-card/FoodTruckCard';
import {
  useGetSaveFoodTrucks,
  useUnsaveFoodTrucks,
} from '@pages/save-food-truck-list/hooks/use-save-food-truck';
import Loading from '@shared/components/loading/Loading';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export default function SaveFoodTruckList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useGetSaveFoodTrucks();
  const { mutate: unsaveFoodTruck } = useUnsaveFoodTrucks();
  const { ref, inView } = useInView();
  const navigate = useNavigate();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);
  const handleClickBack = () => {
    navigate(-1);
  };

  const handleClickCard = () => {};

  return (
    <>
      <Navigation
        text='저장한 푸드트럭'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <div className='flex flex-col gap-[1rem] p-[2rem]'>
        <p className='caption-m-12 text-grayscale-500'>
          총 {data && data.foodTrucks.length ? data.foodTrucks.length : '0'}개
        </p>
        {isPending || !data ? (
          <Loading />
        ) : (
          <div className='flex flex-col gap-[4rem]'>
            {data.foodTrucks
              .filter(item => item.foodTruckId !== null)
              .map(item => (
                <FoodTruckCard
                  key={item.foodTruckId}
                  variant='foodtruckClient'
                  data={{ ...item, isSaved: true }}
                  handleClickCard={handleClickCard}
                  handleClickButton={() => unsaveFoodTruck(item.foodTruckId!)}
                />
              ))}
            <div ref={ref}></div>
          </div>
        )}
      </div>
      <ButtonFloating />
    </>
  );
}
