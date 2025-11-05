import Overlay from '@layout/overlay/Overlay';
import Button from '@ui/button/Button';
import { useNavigate } from 'react-router-dom';

interface DeleteAccountModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export default function DeleteAccountModal({
  isOpen,
  handleClose,
}: DeleteAccountModalProps) {
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    // TODO: 회원탈퇴 api 및 토스트 메시지 추가
    alert('회원탈퇴 되셨습니다.');
    navigate('/');
  };

  return (
    <Overlay isOpen={isOpen} handleClose={handleClose}>
      <div className='flex w-[27.4rem] flex-col gap-[1.6rem] rounded-[1.6rem] bg-white px-[2rem] pb-[2rem] pt-[2.4rem]'>
        <div className='flex flex-col gap-[0.2rem]'>
          <span className='text-grayscale-900 title-sb-16'>
            정말 탈퇴하시겠어요?
          </span>
          <span className='text-grayscale-700 caption-m-12'>
            탈퇴하면 모든 정보가 삭제되며,
            <br /> 복구할 수 없습니다.
          </span>
        </div>
        <div className='flex flex-row justify-between'>
          <Button
            className='w-[11.2rem]'
            variant='cta'
            buttonStyle='sub'
            handleClickButton={handleDeleteAccount}
          >
            탈퇴하기
          </Button>
          <Button
            className='w-[11.2rem]'
            variant='cta'
            buttonStyle='active'
            handleClickButton={handleClose}
          >
            취소
          </Button>
        </div>
      </div>
    </Overlay>
  );
}
