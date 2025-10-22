import DefaultProfile from '@assets/img/img_avatar.png';
import { Icon } from '@components/icon/Icon';

interface SetUserImageProps {
  profileImageUrl: string | undefined;
  handleOpenBottomSheet: () => void;
}

export default function SetUserImage({
  profileImageUrl,
  handleOpenBottomSheet,
}: SetUserImageProps) {
  const profileImage = profileImageUrl ? profileImageUrl : DefaultProfile;
  return (
    <button
      type='button'
      className='relative p-[0.5rem]'
      onClick={handleOpenBottomSheet}
    >
      <img
        className='border-grayscale-200 h-[8rem] w-[8rem] rounded-full border object-cover'
        src={profileImage}
        alt='프로필사진'
      />
      <div className='border-grayscale-200 absolute bottom-[0.8rem] right-[0] z-50 flex h-[3rem] w-[3rem] items-center rounded-[1.5rem] border bg-white p-[0.5rem]'>
        <Icon name='ic_camera' className='text-grayscale-500' />
      </div>
    </button>
  );
}
