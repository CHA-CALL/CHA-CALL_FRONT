import CardImage from '@components/food-truck-card/components/CardImage';
import CardButton from '@components/food-truck-card/components/CardButton';
import { Icon } from '@components/icon/Icon';
import Tag from '@components/tag/Tag';
import type { FoodTruckClientProps } from '@components/food-truck-card/types/food-truck-card-types';

export default function FoodTruckClientCard({
  data,
  isLiked,
  tags,
  handleClickCard,
  handleClickButton,
}: FoodTruckClientProps) {
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
      onClick={handleClickCard}
      className='flex w-full items-start gap-[1.6rem] p-[2rem]'
    >
      <CardImage
        imageUrl={photoUrl}
        altText={name}
        className='h-[8rem] w-[8rem]'
      />

      <div className='flex h-full flex-col'>
        <div className='flex items-center gap-[0.7rem]'>
          <span className='title-sb-16 text-grayscale-900 text-left'>
            {name}
          </span>
          <div className='flex items-center gap-[0.3rem]'>
            <Icon
              name='ic_star_small'
              width={18}
              height={16}
              className='text-grayscale-500'
            />
            <span className='caption-m-11 text-grayscale-500'>
              {averageRating}
            </span>
            <span className='caption-m-10 text-grayscale-300'>
              ({ratingCount})
            </span>
          </div>
        </div>
        <span className='caption-m-11 text-grayscale-700 mb-[1rem] text-left'>
          {description}
        </span>
        <div className='flex items-center gap-[0.5rem]'>
          {tags.map((tag, index) => (
            <Tag key={index} title={tag} />
          ))}
        </div>
      </div>

      <CardButton
        isHeart={true}
        isLiked={isLiked}
        handleClick={handleClickButton}
        buttonIcon='ic_heart_fill'
        className='mb-auto'
      />
    </div>
  );
}
