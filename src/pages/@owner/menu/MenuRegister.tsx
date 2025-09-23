import { useNavigate } from 'react-router-dom';
import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';

export default function MenuRegister() {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
        text='메뉴 등록'
      />
    </>
  );
}
