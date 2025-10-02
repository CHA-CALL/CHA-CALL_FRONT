import type { SavedFoodTruckResponse } from 'apis/data-contracts';
import CardImage from '@components/food-truck-card/components/CardImage';
import CardButton from '@components/food-truck-card/components/CardButton';
import { Icon } from '@components/icon/Icon';
import Tag from '@components/tag/Tag';

interface FoodTruckClientCardProps {
  data: SavedFoodTruckResponse;
  isLiked: boolean;
  tags: string[];
  handleCard: () => void;
  handleCardButton: () => void;
}

export default function FoodTruckClientCard({
  data,
  isLiked,
  tags,
  handleCard,
  handleCardButton,
}: FoodTruckClientCardProps) {
  const {
    photoUrl = '',
    name = '',
    averageRating = 0,
    ratingCount = '',
    description = '',
  } = data;

  return (
    <div
      role='button'
      onClick={handleCard}
      className='flex w-full cursor-pointer'
    >
      <CardImage
        imageUrl={photoUrl}
        altText={name}
        className='w-[8rem] h-[8rem] mr-[1.6rem]'
      />

      <div className='flex flex-col'>
        <div className='flex items-center'>
          <span className='title-sb-16 text-grayscale-900 text-left'>{name}</span>
          <Icon name='ic_star_small' width={18} height={16} className='ml-[0.7rem] text-grayscale-500' />
          <span className='caption-m-11 text-grayscale-500 ml-[0.3rem]'>{averageRating}</span>
          <span className='caption-m-10 text-grayscale-300 ml-[0.2rem]'>({ratingCount})</span>
        </div>
        <span className='caption-m-11 text-grayscale-700 mb-[0.4rem] text-left'>{description}</span>
        <div className='flex items-center gap-[0.5rem] mt-[0.8rem]'>
          {tags.map((tag, index) => (
            <Tag key={index} title={tag} />
          ))}
        </div>
      </div>

      <CardButton
        isHeart={true}
        isLiked={isLiked}
        handleClick={handleCardButton}
        buttonIcon='ic_heart_fill'
        className='mb-auto'
      />
    </div>
  );
}