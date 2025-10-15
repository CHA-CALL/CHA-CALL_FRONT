import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@router/constant/routes';
import Navigation from '@components/navigation/Navigation';
import { Icon } from '@components/icon/Icon';
import Loading from '@components/loading/Loading';
import Button from '@components/button/Button';
import Tooltip from '@components/tooltip/Tooltip';
import ReservationDetailRow from '@pages/reservation-detail/components/ReservationDetailRow';
import { useReservationDetail } from '@pages/reservation-detail/hooks/use-reservation-detail';
import ReservationDetailTopContent from '@pages/reservation-detail/components/ReservationDetailTopContent';

export default function ReservationDetail() {
  // TODO : 추후 툴팁 관련 커스텀 훅 만들어 관리
  const [isOpenTip, setIsOpenTip] = useState(true);
  const navigate = useNavigate();

  const {
    reservationInfo,
    operationInfo,
    etcInfo,
    topContents,
    handleDownload,
    isPending,
  } = useReservationDetail();

  const handleClickBack = () => {
    navigate(ROUTES.RESERVATION_HISTORY);
  };

  const handleCloseTooltip = () => setIsOpenTip(false);

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      <Navigation
        text='상세예약'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
        rightIcon={
          <>
            <Button
              handleClickButton={handleDownload}
              variant='default'
              buttonStyle='sub'
              className='flex h-[2.8rem] w-[2.8rem] items-center justify-center p-[0.5rem]'
            >
              <Icon
                name='ic_download'
                className='h-[1.2rem] w-[1.1rem] text-grayscale-500'
              />
            </Button>
            <Tooltip
              text='PDF로 다운받아 보세요!'
              isTooltipVisible={isOpenTip}
              handleCloseTooltip={handleCloseTooltip}
              positionOffsetY={3.7}
              positionOffsetX={0.9}
              horizontalAlign='right'
              verticalAlign='bottom'
            />
          </>
        }
      />

      <div className='flex flex-col pb-[1.6rem]'>
        {topContents && <ReservationDetailTopContent {...topContents} />}
        <div className='p-[2rem]'>
          <ReservationDetailRow title='예약 내역' infoList={reservationInfo} />
          <div className='my-[2.4rem] border border-grayscale-100' />
          <ReservationDetailRow title='운영 내용' infoList={operationInfo} />
          <div className='my-[2.4rem] border border-grayscale-100' />
          <ReservationDetailRow title='기타 내용' infoList={etcInfo} />
        </div>
      </div>
    </>
  );
}
