import { Icon } from '@components/icon/Icon';

import FoodCategoryChipGroup from '@pages/food-truck-detail/components/FoodCategoryChipGroup';
import ContentDivider from '@pages/food-truck-detail/components/ContentDivider';

interface FoodTruckInfoSectionProps {
  rating: string;
  foodCategories: string[];
  operationInfo: string;
  availableQuantity: string;
  needElectricity: string;
  paymentMethod: string;
}

export default function FoodTruckInfoSection({
  rating,
  foodCategories,
  operationInfo,
  availableQuantity,
  needElectricity,
  paymentMethod,
}: FoodTruckInfoSectionProps) {
  return (
    <div className='flex flex-col gap-[1.6rem] px-[2rem] py-[3rem]'>
      <div className='flex flex-row items-center justify-between px-[0.5rem]'>
        <h3 className='text-grayscale-900 title-sb-12'>평점</h3>
        <div className='flex flex-row items-center gap-[0.8rem]'>
          <Icon
            name='ic_star_full'
            width={18}
            height={18}
            className='text-primary-700'
          />
          <div className='flex flex-row gap-[0.2rem] title-sb-14'>
            <span>{rating}</span>
            <span>/</span>
            <span>5</span>
          </div>
        </div>
      </div>
      <ContentDivider />
      <div className='flex flex-col gap-[0.8rem] px-[0.5rem]'>
        <h3 className='text-grayscale-900 title-sb-12'>판매 음식</h3>
        <FoodCategoryChipGroup categories={foodCategories} />
      </div>
      <ContentDivider />
      <div className='flex flex-col gap-[0.6rem] px-[0.5rem]'>
        <h3 className='text-grayscale-900 title-sb-12'>운영 정보</h3>
        <span className='whitespace-pre-wrap text-grayscale-700 caption-m-12'>
          {operationInfo}
        </span>
      </div>
      <ContentDivider />
      <div className='flex flex-col gap-[0.6rem]'>
        <div className='flex flex-row items-center justify-between'>
          <span className='text-grayscale-500 title-sb-12'>제조 가능 수량</span>
          <span className='text-grayscale-700 body-m-13'>
            {availableQuantity}
          </span>
        </div>
        <div className='flex flex-row items-center justify-between'>
          <span className='text-grayscale-500 title-sb-12'>전기 사용 유무</span>
          <span className='text-grayscale-700 body-m-13'>
            {needElectricity}
          </span>
        </div>
        <div className='flex flex-row items-center justify-between'>
          <span className='text-grayscale-500 title-sb-12'>결제 수단</span>
          <span className='text-grayscale-700 body-m-13'>{paymentMethod}</span>
        </div>
      </div>
    </div>
  );
}
