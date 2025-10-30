import { cn } from '@utils/cn';
import Tag from '@ui/tag/Tag';

interface FoodTruckItemProps {
  image: string;
  name: string;
  priceRange: string;
  minOrder: string;
  tags: string[];
  handleClick?: () => void;
  isLast?: boolean;
}

export default function FoodTruckItem({
  image,
  name,
  priceRange,
  minOrder,
  tags,
  handleClick,
  isLast = false,
}: FoodTruckItemProps) {
  return (
    <button
      type='button'
      onClick={handleClick}
      className={cn(
        'flex w-full gap-[2rem] pb-[2.4rem]',
        !isLast && 'border-grayscale-100 border-b'
      )}
    >
      <img
        src={image}
        alt='food truck'
        className='flex h-[8rem] w-[8rem] cursor-pointer items-center justify-center rounded-[1.6rem] object-cover'
      />

      <div className='flex flex-col items-start'>
        <span className='title-sb-16 mt-[0.5rem]'>{name}</span>

        <div className='caption-m-11 text-grayscale-500 mb-[0.8rem] mt-[0.2rem]'>
          <span>가격대</span>
          <span className='text-grayscale-900 ml-[0.4rem] mr-[1.7rem]'>
            {priceRange}원
          </span>
          <span>최소주문</span>
          <span className='text-grayscale-900 ml-[0.4rem]'>{minOrder}인분</span>
        </div>

        <div className='flex gap-[0.5rem]'>
          {tags.map(tag => (
            <Tag key={tag} title={tag} />
          ))}
        </div>
      </div>
    </button>
  );
}
