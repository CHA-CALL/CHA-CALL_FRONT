import ExtensionMenuItem from '@components/chat/chat-input-area/components/ExtensionMenuItem';
import { Icon } from '@components/icon/Icon';

export default function ClientExtensionMenu() {
  function handleGalleryClick(): void {
    throw new Error('Function not implemented.');
  }

  function handleCameraClick(): void {
    throw new Error('Function not implemented.');
  }

  function handleViewPaperClick(): void {
    throw new Error('Function not implemented.');
  }

  function handleDownloadPaperClick(): void {
    throw new Error('Function not implemented.');
  }

  function handleCancelClick(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className='grid grid-cols-3 gap-x-[2.4rem] gap-y-[1.6rem]'>
      <ExtensionMenuItem
        key='gallery'
        title='앨범'
        icon={<Icon name='ic_gallery' />}
        handleClick={handleGalleryClick}
      />
      <ExtensionMenuItem
        key='camera'
        title='카메라'
        icon={<Icon name='ic_camera' />}
        handleClick={handleCameraClick}
        isDisabled={true}
      />
      <ExtensionMenuItem
        key='view_paper'
        title='견적서 보기'
        icon={<Icon name='ic_view_paper' />}
        handleClick={handleViewPaperClick}
      />
      <ExtensionMenuItem
        key='download_paper'
        title='견적서 다운'
        icon={<Icon name='ic_download_paper' />}
        handleClick={handleDownloadPaperClick}
      />
      <ExtensionMenuItem
        key='cancel'
        title='예약 취소 신청'
        icon={<Icon name='ic_cancel' />}
        handleClick={handleCancelClick}
      />
    </div>
  );
}
