import DefaultProfile from '@assets/img/img_avatar.png';

interface ProfileImageSectionProps {
  profileImageUrl: string | undefined;
}

export default function ProfileImageSection({
  profileImageUrl,
}: ProfileImageSectionProps) {
  const profileImage = profileImageUrl ? profileImageUrl : DefaultProfile;
  return (
    <div className='p-[0.5rem]'>
      <img
        className='border-grayscale-200 h-[8rem] w-[8rem] rounded-full border object-cover'
        src={profileImage}
        alt='프로필사진'
      />
    </div>
  );
}
