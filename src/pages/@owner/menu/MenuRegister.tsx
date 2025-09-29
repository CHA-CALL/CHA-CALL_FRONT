import { useState, useEffect, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@utils/cn';
import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import Button from '@components/button/Button';
import ButtonAddImage from '@components/button-add-image/ButtonAddImage';
import ImagePreview from '@components/image-preview/ImagePreview';

export default function MenuRegister() {
  const navigate = useNavigate();

  const [menuName, setMenuName] = useState('');
  const [menuDescription, setMenuDescription] = useState('');
  const [menuPrice, setMenuPrice] = useState('');

  const NAME_MAX = 18;
  const DESCRIPTION_MAX = 50;
  const IMAGE_MAX = 1;

  const [imageUrl, setImageUrl] = useState<string[] | null>([]);
  const [files, setFiles] = useState<File[]>([]);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFiles([...files, selectedFile]);
    }
    e.target.value = '';
  };

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
  };

  const canAdd = files.length < IMAGE_MAX;

  useEffect(() => {
    const urls = files.map(file => URL.createObjectURL(file));
    setImageUrl(urls);

    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setMenuName(e.target.value);
  };

  const handleClearName = () => {
    setMenuName('');
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
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
        text='메뉴 등록'
      />

      <div className='flex flex-col p-[2rem]'>
        <span className='ml-[0.5rem] mb-[1rem] title-sb-14 text-grayscale-900'>메뉴 이름</span>
        <div className={cn(
          'flex w-full items-center justify-between',
          'mb-[2rem] py-[1.65rem] pl-[2rem] pr-[1rem]',
          'border border-grayscale-300 rounded-[1.6rem]',
          'focus-within:border-grayscale-500',
        )}>
          <input
            className='
              w-full rounded-[1.6rem]
              body-m-14 text-grayscale-900 caret-primary-700
              placeholder:body-m-14 placeholder:text-grayscale-300
            '
            placeholder='텍스트를 입력해주세요.'
            value={menuName}
            onChange={handleChangeName}
            maxLength={NAME_MAX}
          />
          <div className='caption-m-12 flex items-center justify-end gap-[0.1rem] mr-[0.5rem]'>
            <p className='text-primary-700'>{menuName.length}</p>
            <p className='text-grayscale-700'>/</p>
            <p className='text-grayscale-700'>{NAME_MAX}</p>
            <button type='button' onClick={handleClearName}>
              <Icon name='ic_close' width={16} height={16} className='pt-[0.3rem] pl-[0.3rem]' />
            </button>
          </div>
        </div>

        <span className='ml-[0.5rem] mb-[1rem] title-sb-14 text-grayscale-900'>메뉴 설명</span>
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
          maxLength={DESCRIPTION_MAX}
        />
        <div className='caption-m-12 flex items-center justify-end gap-[0.1rem] mt-[0.6rem] mr-[0.5rem]'>
          <p className='text-primary-700'>{menuDescription.length}</p>
          <p className='text-grayscale-700'>/</p>
          <p className='text-grayscale-700'>{DESCRIPTION_MAX}</p>
        </div>

        <span className='ml-[0.5rem] mb-[1rem] title-sb-14 text-grayscale-900'>가격</span>
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

        <div className='flex items-center justify-between mb-[0.6rem]'>
          <span className='ml-[0.5rem] title-sb-14 text-grayscale-900'>사진 등록</span>
          <div className='caption-m-12 flex items-center gap-[0.1rem] mr-[0.5rem]'>
            <p className='text-primary-700'>{files.length}</p>
            <p className='text-grayscale-700'>/</p>
            <p className='text-grayscale-700'>{IMAGE_MAX}</p>
          </div>
        </div>
        <div className='flex pt-[1rem]'>
          {canAdd && <ButtonAddImage handleFileChange={handleFileChange} />}
          {files &&
            files.map((_, index) => (
              <ImagePreview
                key={`otherDocs-${index}`}
                handleClose={() => removeFile(index)}
                src={imageUrl?.[index] || undefined}
                alt='otherDocs'
              />
            ))}
        </div>
      </div>

      <footer className='fixed-center bottom-[0] w-full px-[2rem] py-[1.7rem]'>
        <Button
          variant='cta'
          buttonStyle='active'
          handleClickButton={handleSave}
        >
          저장하기
        </Button>
      </footer>
    </>
  );
}
