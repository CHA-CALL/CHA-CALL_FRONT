import Tag from '@components/tag/Tag';

interface FoodTruckItemProps {
  image: string;
  name: string;
  priceRange: string;
  minOrder: string;
  tags: string[];
}

export default function FoodTruckItem({
  image,
  name,
  priceRange,
  minOrder,
  tags,
}: FoodTruckItemProps) {
  return (
    <div className='flex gap-[2rem] w-full pb-[2.4rem] border-b border-grayscale-100'>
      <img
        src={image}
        alt='food truck'
        className='w-[8rem] h-[8rem] cursor-pointer rounded-[1.6rem] flex items-center justify-center object-cover'
      />

      <div className='flex flex-col'>
        <span className='title-sb-16 mt-[0.5rem]'>
          {name}
        </span>

        <div className='caption-m-11 text-grayscale-500 mt-[0.2rem] mb-[0.8rem]'>
          <span>가격대</span>
          <span className='text-grayscale-900 ml-[0.4rem] mr-[1.7rem]'>
            {priceRange}원
          </span>
          <span>최소주문</span>
          <span className='text-grayscale-900 ml-[0.4rem]'>
            {minOrder}
          </span>
        </div>

        <div className='flex gap-[0.5rem]'>
          {tags.map((tag) => (
            <Tag key={tag} title={tag} />
          ))}
        </div>
      </div>
    </div>
  )
}
