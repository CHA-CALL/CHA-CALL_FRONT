import { Icon } from '@components/icon/Icon';

interface FoodTruckHeaderSectionProps {
  photoUrl: string[];
  name: string;
  isSaved: boolean;
  description: string;
  foodTruckServiceAreas: string[];
  activeTime: string;
  timeDiscussRequired: boolean;
  phoneNumber: string;
  handleClickSaveButton: () => void;
}

export default function FoodTruckHeaderSection({
  photoUrl,
  name,
  isSaved,
  description,
  foodTruckServiceAreas,
  activeTime,
  timeDiscussRequired,
  phoneNumber,
  handleClickSaveButton,
}: FoodTruckHeaderSectionProps) {
  return (
    <>
      <img
        src={photoUrl[0]}
        alt='푸드트럭 이미지'
        className='h-[21.1rem] w-full object-cover'
      />
      <div className='flex flex-col gap-[1.6rem] p-[2rem]'>
        <div className='flex flex-col gap-[0.2rem]'>
          <div className='flex flex-row items-center justify-between'>
            <h1 className='text-grayscale-900 heading-sb-20'>{name}</h1>
            <Icon
              name={isSaved ? 'ic_heart_fill' : 'ic_heart_empty'}
              width={24}
              height={24}
              className='text-primary-700'
              onClick={handleClickSaveButton}
            />
          </div>
          <span className='text-grayscale-700 body-m-14'>{description}</span>
        </div>
        <div className='flex flex-col gap-[0.6rem]'>
          <div className='flex flex-row items-center gap-[0.8rem]'>
            <Icon
              name='ic_locate'
              width={18}
              height={18}
              className='text-grayscale-300'
            />
            <span className='text-grayscale-700 body-m-13'>
              {foodTruckServiceAreas.join(' · ')}
            </span>
          </div>
          <div className='flex flex-row items-center gap-[0.8rem]'>
            <Icon
              name='ic_time'
              width={18}
              height={18}
              className='text-grayscale-300'
            />
            <div className='flex flex-row items-center gap-[0.4rem]'>
              <span className='text-grayscale-700 body-m-13'>{activeTime}</span>
              <span className='title_sb_14 text-grayscale-300'>·</span>
              <span className='text-grayscale-700 body-m-13'>
                {timeDiscussRequired ? '논의 가능' : '논의 불가능'}
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
