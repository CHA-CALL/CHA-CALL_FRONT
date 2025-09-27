import Navigation from '@shared/components/navigation/Navigation';
import { Icon } from '@shared/components/icon/Icon';
import { useRole } from '@shared/hooks/use-role';
import { ROLE } from '@shared/constant/role';
import ClientInfoHeader from '@pages/reservation-detail/components/ClientInfoHeader';
import ProviderInfoHeader from '@pages/reservation-detail/components/ProviderInfoHeader';
import InfoCard from '@pages/reservation-detail/components/InfoCard';
import type { ReservationResponse } from 'apis/data-contracts';
import { useEffect, useState } from 'react';
import { INITIAL_DATA, MOCKUP_DATA } from './constant/reservation-detail';
import Button from '@shared/components/button/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import Tooltip from '@shared/components/tooltip/Tooltip';

export default function ReservationDetail() {
  const { role } = useRole();
  const isProvider = role === ROLE.PROVIDER;
  // TODO : 추후 툴팁 관련 커스텀 훅 만들어 관리
  const [isOpenTip, setIsOpenTip] = useState(true);
  const [reservationData, setReservationData] =
    useState<ReservationResponse>(INITIAL_DATA);
  const {
    address,
    detailAddress,
    reservationDates,
    operationHour,
    menu,
    deposit,
    isUseElectricity,
    etcRequest,
  } = reservationData;
  const navigate = useNavigate();

  // 순수 텍스트, 날짜 - 날짜별 줄바꿈, 금액 구분자 추가하기, boolean 따라 가능/불가능.
  const reservationInfo = [
    {
      label: '장소',
      data: `${address} ${detailAddress}`,
    },
    {
      label: '날짜',
      data: reservationDates?.join('\n'),
    },
    {
      label: '시간',
      data: operationHour,
    },
  ];

  const operationInfo = [
    {
      label: '음식',
      data: menu,
    },
    {
      label: '결제금',
      data: `${deposit?.toLocaleString('ko-kr')} 원`,
    },
  ];

  const etcInfo = [
    {
      label: '전기 사용 유무',
      data: isUseElectricity ? '가능' : '불가능',
    },
    {
      label: '기타 요청 사항',
      data: etcRequest,
    },
  ];

  const handleClickBack = () => {
    navigate(ROUTES.RESERVATION);
  };
  const handleDownload = () => {
    //TODO : 다운로드 API 연동 예정
    alert('예약 페이지 pdf 다운로드');
  };
  useEffect(() => {
    setReservationData(MOCKUP_DATA);
  }, []);

  return (
    <>
      <Navigation
        text='상세예약'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
        rightIcon={
          <>
            <Button
              onClick={handleDownload}
              children={
                <>
                  <Icon
                    name='ic_download'
                    className='text-grayscale-500 h-[1.2rem] w-[1.1rem]'
                  />
                </>
              }
              variant={'default'}
              buttonStyle={'sub'}
              className='flex h-[2.8rem] w-[2.8rem] items-center justify-center p-[0.5rem]'
            />
            <Tooltip
              text={'PDF로 다운받아 보세요!'}
              isTooltipVisible={isOpenTip}
              handleCloseTooltip={() => setIsOpenTip(false)}
              positionOffsetY={3.8}
              positionOffsetX={1.4}
              horizontalAlign='right'
              verticalAlign='bottom'
            />
          </>
        }
      />

      <div className='flex h-[calc(100vh-4.8rem)] flex-col pb-[1.6rem]'>
        {isProvider ? (
          <ClientInfoHeader foodTruckName={''} clientName={''} />
        ) : (
          <ProviderInfoHeader foodTruckName={'오소리 푸드트럭'} />
        )}
        <ClientInfoHeader
          foodTruckName={'오소리 푸드트럭'}
          clientName={'이현준'}
        />
        <div className='p-[2rem]'>
          <InfoCard title={'예약 내역'} infoList={reservationInfo} />
          <div className='border-grayscale-100 my-[2.4rem] border' />
          <InfoCard title={'운영 내용'} infoList={operationInfo} />
          <div className='border-grayscale-100 my-[2.4rem] border' />
          <InfoCard title={'기타 내용'} infoList={etcInfo} />
        </div>
      </div>
    </>
  );
}
