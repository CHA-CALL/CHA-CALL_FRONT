import CardImage from '@components/food-truck/components/CardImage';
import CardButton from '@components/food-truck/components/CardButton';
import { Icon } from '@components/icon/Icon';
import Tag from '@ui/tag/Tag';
import type { FoodTruckClientProps } from '@components/food-truck/types/food-truck-card-types';

export default function FoodTruckClientCard({
  data,
  handleClickCard,
  handleClickButton,
}: FoodTruckClientProps) {
  const {
    foodTruckId = 0,
    name = '',
    photoUrl = '',
    description = '',
    menuCategories = [],
    averageRating = 0,
    ratingCount = 0,
    isSaved = false,
  } = data;

  return (
    <div
      role='button'
      onClick={() => handleClickCard(foodTruckId)}
      className='flex w-full cursor-pointer'
    >
      <CardImage
        imageUrl={photoUrl}
        altText={name}
        className='mr-[1.6rem] h-[8rem] min-w-[8rem] max-w-[8rem]'
      />

      <div className='flex flex-col'>
        <div className='flex items-center'>
          <span className='text-grayscale-900 title-sb-16 text-left'>
            {name}
          </span>
          <Icon
            name='ic_star_small'
            width={18}
            height={16}
            className='text-grayscale-500 ml-[0.7rem]'
          />
          <span className='text-grayscale-500 caption-m-11 ml-[0.3rem]'>
            {averageRating.toFixed(1)}
          </span>
          <span className='text-grayscale-300 caption-m-10 ml-[0.2rem]'>
            ({ratingCount})
          </span>
        </div>
        <span className='text-grayscale-700 caption-m-11 mb-[0.4rem] text-left'>
          {description}
        </span>
        <div className='mt-[0.8rem] flex items-center gap-[0.5rem]'>
          {menuCategories.map((tag, index) => (
            <Tag key={index} title={tag} />
          ))}
        </div>
      </div>

      <CardButton
        isHeart={true}
        isLiked={isSaved}
        handleClick={() => handleClickButton(foodTruckId, !isSaved)}
        buttonIcon='ic_heart_fill'
        className='mb-auto'
      />
    </div>
  );
}
