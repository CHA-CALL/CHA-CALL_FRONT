import { useState } from 'react';
import Button from '@ui/button/Button';
import Overlay from '@layout/overlay/Overlay';
import Input from '@ui/input/Input';
import { Icon } from '@icon/Icon';
import RatingBottomSheet from '@ui/rating-bottom-sheet/RatingBottomSheet';

const Home = () => {
  // BottomSheet states
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search states
  const [searchValue, setSearchValue] = useState('');

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Modal */}
      <Overlay
        isOpen={isModalOpen}
        position='center'
        handleClose={handleCloseModal}
      >
        <div>
          <h3 className='mb-[2rem] text-[1.8rem] font-bold'>모달 제목</h3>
          <p className='mb-[2rem]'>모달 내용입니다.</p>
          <div className='flex gap-[1rem]'>
            <Button
              variant='cta'
              buttonStyle='sub'
              handleClickButton={handleCloseModal}
            >
              취소
            </Button>
            <Button
              variant='cta'
              buttonStyle='active'
              handleClickButton={handleCloseModal}
            >
              확인
            </Button>
          </div>
        </div>
      </Overlay>

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
    </div>
  );
};

export default Home;
