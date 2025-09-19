import { useState } from 'react';
import Button from '@shared/components/button/Button';
import Overlay from '@shared/components/overlay/Overlay';
import SearchBar from '@shared/components/search-bar/SearchBar';
import BottomSheet from '@shared/components/bottom-sheet/BottomSheet';

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
      <Overlay
        isOpen={isBottomSheetOpen}
        position='bottom'
        handleClose={handleCloseBottomSheet}
      >
        <BottomSheet
          isOpen={isBottomSheetOpen}
          handleCloseBottomSheet={handleCloseBottomSheet}
          sheetContent={
            <div>
              <h3 className='mb-[2rem] text-[1.8rem] font-bold'>
                바텀시트 내용
              </h3>
              <p className='mb-[2rem]'>이것은 바텀시트의 내용입니다.</p>
            </div>
          }
          sheetHeight={400}
        />
      </Overlay>

      {/* Search Bar */}
      <section>
        <h2 className='mb-[2rem] text-[2rem] font-bold'>Search Bar</h2>
        <SearchBar
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
    </div>
  );
};

export default Home;
