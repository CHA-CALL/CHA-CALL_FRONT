import { Icon } from '@components/icon/Icon';

interface ButtonCloseProps {
  onClick: () => void;
}

export default function ButtonClose({ onClick }: ButtonCloseProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='flex px-[0.64rem] py-[0.64rem] bg-grayscale-900 rounded-full'
    >
      <Icon name='ic_close_white' />
    </button>
  )
}
