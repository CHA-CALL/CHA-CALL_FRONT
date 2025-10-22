import { Icon } from '@components/icon/Icon';

interface FoodTruckHeaderSectionProps {
  photoUrl: string;
  foodTruckName: string;
  desc: string;
  location: string;
  time: string;
  availableDiscussion: string;
  phoneNumber: string;
}

export default function FoodTruckHeaderSection({
  photoUrl,
  foodTruckName,
  desc,
  location,
  time,
  availableDiscussion,
  phoneNumber,
}: FoodTruckHeaderSectionProps) {
  return (
    <>
      <img
        src={photoUrl}
        alt='푸드트럭 이미지'
        className='h-[21.1rem] w-full object-cover'
      />
      <div className='flex flex-col gap-[1.6rem] p-[2rem]'>
        <div className='flex flex-col gap-[0.2rem]'>
          <div className='flex flex-row items-center justify-between'>
            <h1 className='text-grayscale-900 heading-sb-20'>
              {foodTruckName}
            </h1>
            <Icon name='ic_heart_empty' width={24} height={24} />
          </div>
          <span className='text-grayscale-700 body-m-14'>{desc}</span>
        </div>
        <div className='flex flex-col gap-[0.6rem]'>
          <div className='flex flex-row items-center gap-[0.8rem]'>
            <Icon
              name='ic_locate'
              width={18}
              height={18}
              className='text-grayscale-300'
            />
            <span className='text-grayscale-700 body-m-13'>{location}</span>
          </div>
          <div className='flex flex-row items-center gap-[0.8rem]'>
            <Icon
              name='ic_time'
              width={18}
              height={18}
              className='text-grayscale-300'
            />
            <div className='flex flex-row items-center gap-[0.4rem]'>
              <span className='text-grayscale-700 body-m-13'>{time}</span>
              <span className='title_sb_14 text-grayscale-300'>·</span>
              <span className='text-grayscale-700 body-m-13'>
                {availableDiscussion}
              </span>
            </div>
          </div>
          <div className='flex flex-row items-center gap-[0.8rem]'>
            <Icon
              name='ic_phone'
              width={18}
              height={18}
              className='text-grayscale-300'
            />
            <span className='text-grayscale-700 body-m-13'>{phoneNumber}</span>
          </div>
        </div>
      </div>
    </>
  );
}
