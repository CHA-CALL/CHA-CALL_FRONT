import { Icon } from '@components/icon/Icon';

interface ButtonTrashProps {
  handleClick: () => void;
}

export default function ButtonTrash({ handleClick }: ButtonTrashProps) {
  return (
    <button
      type='button'
      onClick={handleClick}
      className='flex px-[0.2rem] py-[0.2rem] bg-white border-[0.1rem] border-grayscale-200 rounded-[0.4rem]'
    >
      <Icon
        name='ic_trash'
        width={22}
        height={22}
        color='#CCCED5'
      />
    </button>
  )
}
