import ExtensionMenuItem from '@components/chat/chat-input-area/components/ExtensionMenuItem';
import { Icon } from '@components/icon/Icon';

export default function ProviderExtensionMenu() {
  function handleGalleryClick(): void {
    throw new Error('Function not implemented.');
  }

  function handleCameraClick(): void {
    throw new Error('Function not implemented.');
  }

  function handleMentClick(): void {
    throw new Error('Function not implemented.');
  }

  function handleCashClick(): void {
    throw new Error('Function not implemented.');
  }

  function handleWritePaperClick(): void {
    throw new Error('Function not implemented.');
  }

  function handleEditPaperClick(): void {
    throw new Error('Function not implemented.');
  }

  function handleViewPaperClick(): void {
    throw new Error('Function not implemented.');
  }

  function handleCancelClick(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className='grid grid-cols-4 gap-x-[2.4rem] gap-y-[1.6rem]'>
      <ExtensionMenuItem
        key='gallery'
        title='앨범'
        icon={<Icon name='ic_gallery' />}
        handleClick={handleGalleryClick}
        isDisabled={false}
      />
      <ExtensionMenuItem
        key='camera'
        title='카메라'
        icon={<Icon name='ic_camera' />}
        handleClick={handleCameraClick}
        isDisabled={true} // 예시: 카메라만 비활성화
      />
      <ExtensionMenuItem
        key='ment'
        title='자주쓰는 문구'
        icon={<Icon name='ic_ment' />}
        handleClick={handleMentClick}
      />
      <ExtensionMenuItem
        key='cash'
        title='계좌번호'
        icon={<Icon name='ic_cash' />}
        handleClick={handleCashClick}
      />
      <ExtensionMenuItem
        key='write_paper'
        title='견적서 작성'
        icon={<Icon name='ic_write_paper' />}
        handleClick={handleWritePaperClick}
      />
      <ExtensionMenuItem
        key='edit_paper'
        title='견적서 수정'
        icon={<Icon name='ic_edit_paper' />}
        handleClick={handleEditPaperClick}
      />
      <ExtensionMenuItem
        key='view_paper'
        title='견적서 보기'
        icon={<Icon name='ic_view_paper' />}
        handleClick={handleViewPaperClick}
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
