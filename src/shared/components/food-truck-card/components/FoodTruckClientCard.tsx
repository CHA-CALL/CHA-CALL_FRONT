import type { FoodTruckResponse } from 'apis/data-contracts';

import CardImage from '@components/food-truck-card/components/CardImage';
import CardButton from '@components/food-truck-card/components/CardButton';
import { Icon } from '@components/icon/Icon';
import Tag from '@components/tag/Tag';
import { useState } from 'react';

interface FoodTruckClientCardProps {
  data: FoodTruckResponse;
  tags: string[];
  handleCard: (_foodTruckId: number) => void;
  handleCardButton: (_foodTruckId: number, _isSavedRequest: boolean) => void;
}

export default function FoodTruckClientCard({
  data,
  tags,
  handleCard,
  handleCardButton,
}: FoodTruckClientCardProps) {
  const {
    foodTruckId = 0,
    name = '',
    photoUrl = '',
    description = '',
    averageRating = 0,
    ratingCount = 0,
    isSaved = false,
  } = data;

  const [isSavedClient, setIsSavedClient] = useState(isSaved);

  const handleToggleSaveButton = () => {
    handleCardButton(foodTruckId, !isSavedClient);
    setIsSavedClient(!isSavedClient);
  };

  return (
    <div
      role='button'
      onClick={() => handleCard(foodTruckId)}
      className='flex w-full cursor-pointer'
    >
      <CardImage
        imageUrl={photoUrl}
        altText={name}
        className='mr-[1.6rem] h-[8rem] w-[8rem]'
      />

      <div className='flex flex-col'>
        <div className='flex items-center'>
          <span className='text-left text-grayscale-900 title-sb-16'>
            {name}
          </span>
          <Icon
            name='ic_star_small'
            width={18}
            height={16}
            className='ml-[0.7rem] text-grayscale-500'
          />
          <span className='ml-[0.3rem] text-grayscale-500 caption-m-11'>
            {averageRating}
          </span>
          <span className='ml-[0.2rem] text-grayscale-300 caption-m-10'>
            ({ratingCount})
          </span>
        </div>
        <span className='mb-[0.4rem] text-left text-grayscale-700 caption-m-11'>
          {description}
        </span>
        <div className='mt-[0.8rem] flex items-center gap-[0.5rem]'>
          {tags.map((tag, index) => (
            <Tag key={index} title={tag} />
          ))}
        </div>
      </div>

      <CardButton
        isHeart={true}
        isLiked={isSavedClient}
        handleClick={handleToggleSaveButton}
        buttonIcon='ic_heart_fill'
        className='mb-auto'
      />
    </div>
  );
}
