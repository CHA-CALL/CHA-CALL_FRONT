import Navigation from '@shared/components/navigation/Navigation';
import { Icon } from '@shared/components/icon/Icon';
import ClientInfoHeader from '@pages/reservation-detail/components/ClientInfoHeader';
import ProviderInfoHeader from '@pages/reservation-detail/components/ProviderInfoHeader';
import ReservationDetailRow from '@pages/reservation-detail/components/ReservationDetailRow';
import { useState } from 'react';
import Button from '@shared/components/button/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import Tooltip from '@shared/components/tooltip/Tooltip';
import { useReservationDetail } from '@pages/reservation-detail/hooks/use-reservation-detail';

export default function ReservationDetail() {
  // TODO : 추후 툴팁 관련 커스텀 훅 만들어 관리
  const [isOpenTip, setIsOpenTip] = useState(true);
  const navigate = useNavigate();

  const { isProvider, reservationInfo, operationInfo, etcInfo } =
    useReservationDetail();

  const handleClickBack = () => {
    navigate(ROUTES.RESERVATION);
  };
  const handleDownload = () => {
    //TODO : 다운로드 API 연동 예정
    alert('다운로드 버튼 클릭');
  };
  const handleCloseTooltip = () => setIsOpenTip(false);
  const handleTruckDetail = () => {};

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
                className='text-grayscale-500 h-[1.2rem] w-[1.1rem]'
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
        {isProvider ? (
          <ClientInfoHeader
            foodTruckName='오소리 푸드트럭'
            clientName='차콜콜'
          />
        ) : (
          <ProviderInfoHeader
            foodTruckName='오소리 푸드트럭'
            handleTruckDetail={handleTruckDetail}
          />
        )}
        <div className='p-[2rem]'>
          <ReservationDetailRow title='예약 내역' infoList={reservationInfo} />
          <div className='border-grayscale-100 my-[2.4rem] border' />
          <ReservationDetailRow title='운영 내용' infoList={operationInfo} />
          <div className='border-grayscale-100 my-[2.4rem] border' />
          <ReservationDetailRow title='기타 내용' infoList={etcInfo} />
        </div>
      </div>
    </>
  );
}
