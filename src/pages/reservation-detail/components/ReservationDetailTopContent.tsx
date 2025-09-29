import { Icon } from '@shared/components/icon/Icon';
import Tag from '@shared/components/tag/Tag';
import { ROLE } from '@shared/constant/role';

interface CommonInfo {
  foodTruckName: string;
}

interface ProviderViewProps extends CommonInfo {
  role: typeof ROLE.PROVIDER;
  clientName: string;
}

interface ClientViewProps extends CommonInfo {
  role: typeof ROLE.CLIENT;
  handleTruckDetail: () => void;
}

export type ReservationDetailTopContentProps =
  | ProviderViewProps
  | ClientViewProps;

export default function ReservationDetailTopContent(
  props: ReservationDetailTopContentProps
) {
  if (props.role === ROLE.PROVIDER) {
    const { foodTruckName, clientName } = props;
    return (
      <>
        <div className='flex gap-[2rem] p-[2rem]'>
          <div className='p-[0.4rem]'>
            <img
              src='https://placehold.co/50'
              alt='client-portrait'
              className='rounded-[1.6rem]'
            />
          </div>

          <div className='flex flex-col gap-[0.3rem] py-[0.4rem] pr-[0.4rem]'>
            <Tag title={foodTruckName} />
            <p className='title-sb-14 text-grayscale-700 flex items-center gap-[0.8rem]'>
              <span className='heading-sb-18 text-grayscale-900'>
                {clientName}
              </span>
              <span className='translate-y-[0.1rem]'>고객님</span>
            </p>
          </div>
        </div>
        <div className='border-grayscale-50 my-[1rem] border-[0.4rem]' />
      </>
    );
  }

  if (props.role === ROLE.CLIENT) {
    const { foodTruckName, handleTruckDetail } = props;
    return (
      <div className='flex flex-col gap-[2rem] pb-[0.4rem]'>
        <img
          src='https://placehold.co/256'
          alt='foodtruck-banner'
          className='object-fit h-[21.1rem] w-full'
        />
        <button
          type='button'
          className='flex items-center gap-[0.4rem] px-[2rem]'
          onClick={handleTruckDetail}
        >
          <h2 className='heading-sb-18 text-grayscale-900'>{foodTruckName}</h2>
          <Icon name={'ic_next'} />
        </button>
      </div>
    );
  }
}
