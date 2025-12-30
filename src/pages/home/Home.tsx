import TimePicker from '@components/time-picker/TimePicker';
import AlertModal from '@components/ui/modal-alert/AlertModal';
import { Icon } from '@icon/Icon';
import AgreeToTermsBottomSheet from '@shared/components/agree-to-terms/AgreeToTermsBottomSheet';
import type { TimeType } from '@type/time-types';
import Button from '@ui/button/Button';
import Input from '@ui/input/Input';
import RatingBottomSheet from '@ui/rating-bottom-sheet/RatingBottomSheet';
import { useState } from 'react';

const Home = () => {
  // BottomSheet states
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const [isAgreementBottomSheetOpen, setIsAgreementBottomSheetOpen] =
    useState(false);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search states
  const [searchValue, setSearchValue] = useState('');

  // Time states
  const [activeTime, setActiveTime] = useState<TimeType | null>(null);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleCloseAgreementBottomSheet = () => {
    setIsAgreementBottomSheetOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTimeChange = (time: TimeType | null) => {
    setActiveTime(time);
  };

  return (
    <div>
      {/* Modal */}
      <AlertModal
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        title={'모달 제목'}
        description={'모달 내용입니다.'}
      />

      {/* BottomSheet */}
      <RatingBottomSheet
        reservationId={4}
        foodTruckId={1}
        isOpen={isBottomSheetOpen}
        handleCloseBottomSheet={handleCloseBottomSheet}
      />
      {/* Search Bar */}
      <section>
        <h2 className='mb-[2rem] text-[2rem] font-bold'>Search Bar</h2>
        <Input
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder='검색어를 입력하세요'
        />
      </section>
      {/* Modal and BottomSheet Triggers */}
      <section>
        <h2 className='mb-[2rem] text-[2rem] font-bold'>
          Modals & Bottom Sheets
        </h2>
        <div className='flex gap-[2rem]'>
          <Button
            variant='cta'
            buttonStyle='active'
            handleClickButton={handleOpenModal}
          >
            모달 열기
          </Button>
          <Button
            variant='cta'
            buttonStyle='active'
            handleClickButton={handleOpenBottomSheet}
          >
            바텀시트 열기
          </Button>
        </div>
      </section>
      <Icon name='ic_chat_dot' className='text-primary-500' />
      <TimePicker
        timeTitle='운영 시작'
        time={activeTime}
        handleTimeChange={handleTimeChange}
      />
      <AgreeToTermsBottomSheet
        isAgreed={!isAgreementBottomSheetOpen}
        isForOwner={false}
        handleCloseBottomSheet={handleCloseAgreementBottomSheet}
      />
    </div>
  );
};

export default Home;
