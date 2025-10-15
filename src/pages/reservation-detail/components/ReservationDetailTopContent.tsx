import { Icon } from '@components/icon/Icon';
import Tag from '@components/tag/Tag';
import { ROLE } from '@shared/constant/role';

interface CommonInfo {
  foodTruckName?: string;
}

interface ProviderViewProps extends CommonInfo {
  role: typeof ROLE.PROVIDER;
  clientName?: string;
  profileImage?: string;
}

interface ClientViewProps extends CommonInfo {
  role: typeof ROLE.CLIENT;
  photoUrl?: string;
  handleTruckDetail: () => void;
}

export type ReservationDetailTopContentProps =
  | ProviderViewProps
  | ClientViewProps;

export default function ReservationDetailTopContent(
  props: ReservationDetailTopContentProps
) {
  if (props.role === ROLE.PROVIDER) {
    const { foodTruckName, clientName, profileImage } = props;
    return (
      <>
        <div className='flex gap-[2rem] p-[2rem]'>
          <div className='p-[0.4rem]'>
            <img
              src={profileImage}
              alt='client-portrait'
              className='max-h-[5rem] min-h-[5rem] min-w-[5rem] max-w-[5rem] rounded-[1.6rem] border border-grayscale-200'
            />
          </div>

          <div className='flex flex-col gap-[0.3rem] py-[0.4rem] pr-[0.4rem]'>
            {foodTruckName && <Tag title={foodTruckName} />}
            <p className='flex items-center gap-[0.8rem] text-grayscale-700 title-sb-14'>
              <span className='text-grayscale-900 heading-sb-18'>
                {clientName}
              </span>
              <span className='translate-y-[0.1rem]'>고객님</span>
            </p>
          </div>
        </div>
        <div className='my-[1rem] border-[0.4rem] border-grayscale-50' />
      </>
    );
  }

  if (props.role === ROLE.CLIENT) {
    const { foodTruckName, photoUrl, handleTruckDetail } = props;
    return (
      <div className='flex flex-col gap-[2rem] pb-[0.4rem]'>
        <img
          src={photoUrl}
          alt='foodtruck-banner'
          className='object-fit h-[21.1rem] w-full'
        />
        <button
          type='button'
          className='flex items-center gap-[0.4rem] px-[2rem]'
          onClick={handleTruckDetail}
        >
          <h2 className='text-grayscale-900 heading-sb-18'>{foodTruckName}</h2>
          <Icon name='ic_next' />
        </button>
      </div>
    );
  }
}
