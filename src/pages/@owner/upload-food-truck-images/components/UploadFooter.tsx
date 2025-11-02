import Button from '@shared/components/button/Button';

interface UploadFooterProps {
  imagesLength: number;
  handleSubmitImage: () => void;
}

export default function UploadFooter ({
  imagesLength,
  handleSubmitImage
}: UploadFooterProps) {
  return (
    <footer className='fixed bottom-[1.7rem] left-[0rem] right-[0rem] mx-auto w-full max-w-[60rem] bg-white px-[2rem]'>
      <Button
        variant='cta'
        buttonStyle={(imagesLength || 0) > 0 ? 'active' : 'disabled'}
        handleClickButton={handleSubmitImage}
        disabled={(imagesLength || 0) === 0}
      >
        등록하기
      </Button>
    </footer>
  );
}
