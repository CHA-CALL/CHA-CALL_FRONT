import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import Button from '@components/button/Button';

export default function MenuRegister() {
  const navigate = useNavigate();

  const [menuName, setMenuName] = useState('');
  const [menuDescription, setMenuDescription] = useState('');
  const [menuPrice, setMenuPrice] = useState('');

  const MAX_LENGTH = 50;

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleChangeName = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMenuName(e.target.value);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMenuDescription(e.target.value);
  };

  const handleChangePrice = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    // TODO: zod로 유효성 검사 필요
    if (value === '' || /^\d+$/.test(value)) {
      setMenuPrice(value);
    }
  };

  const handleSave = () => {
    navigate(-1);
    // TODO: 메뉴 등록 로직 구현
  };

  return (
    <div className='flex flex-col w-full h-screen bg-white'>
      <Navigation
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
        text='메뉴 등록'
      />

      <div className='flex flex-col p-[2rem]'>
        <span className='ml-[0.5rem] mb-[1rem] title-sb-16 text-grayscale-900'>메뉴이름</span>
        <textarea
          className='
            h-[5.6rem] mb-[2rem] px-[2rem] py-[1.65rem] rounded-[1.6rem]
            body-m-14 text-grayscale-900 border-grayscale-300 caret-primary-700
            placeholder:body-m-14 placeholder:text-grayscale-300
            focus:border-grayscale-500 focus:outline-none
          '
          placeholder='텍스트를 입력해주세요.'
          value={menuName}
          onChange={handleChangeName}
        />

        <span className='ml-[0.5rem] mb-[1rem] title-sb-16 text-grayscale-900'>메뉴설명</span>
        <textarea
          className='
            h-[12.2rem] px-[2rem] py-[1.65rem] rounded-[1.6rem]
            body-m-14 text-grayscale-900 border-grayscale-300 caret-primary-700
            placeholder:body-m-14 placeholder:text-grayscale-300
            focus:border-grayscale-500 focus:outline-none
          '
          placeholder='텍스트를 입력해주세요.'
          value={menuDescription}
          onChange={handleChangeDescription}
          maxLength={MAX_LENGTH}
        />
        <div className='caption-m-12 flex items-center justify-end gap-[0.1rem] mt-[0.6rem] mr-[0.5rem]'>
          <p className='text-primary-700'>{menuDescription.length}</p>
          <p className='text-grayscale-700'>/</p>
          <p className='text-grayscale-700'>{MAX_LENGTH}</p>
        </div>

        <span className='ml-[0.5rem] mb-[1rem] title-sb-16 text-grayscale-900'>가격</span>
        <textarea
          className='
            h-[5.6rem] mb-[2rem] px-[2rem] py-[1.65rem] rounded-[1.6rem]
            body-m-14 text-grayscale-900 border-grayscale-300 caret-primary-700
            placeholder:body-m-14 placeholder:text-grayscale-300
            focus:border-grayscale-500 focus:outline-none
          '
          placeholder='텍스트를 입력해주세요.'
          value={menuPrice}
          onChange={handleChangePrice}
        />
      </div>


      <div className='flex-1' />
      <footer className='sticky bottom-[0] w-full px-[2rem] py-[1.7rem]'>
        <Button
          variant='cta'
          buttonStyle='active'
          handleClickButton={handleSave}
        >
          저장하기
        </Button>
      </footer>
    </div>
  );
}
