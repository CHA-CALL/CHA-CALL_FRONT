export type MenuItemConfig = {
  id: string;
  title: string;
  iconId:
    | 'ic_camera'
    | 'ic_gallery'
    | 'ic_ment'
    | 'ic_cash'
    | 'ic_write_paper'
    | 'ic_edit_paper'
    | 'ic_view_paper'
    | 'ic_cancel'
    | 'ic_download_paper';
  disabled: boolean;
  handleClick: () => void;
  requiredRole: 'provider' | 'client' | 'all';
};

const handleCameraClick = () => {};

export const ALL_MENU_ITEMS: MenuItemConfig[] = [
  {
    id: 'gallery',
    title: '앨범',
    iconId: 'ic_gallery',
    disabled: false,
    handleClick: handleCameraClick,
    requiredRole: 'all',
  },
  {
    id: 'camera',
    title: '카메라',
    iconId: 'ic_camera',
    disabled: false,
    handleClick: handleCameraClick,
    requiredRole: 'all',
  },
  {
    id: 'ment',
    title: '자주쓰는 문구',
    iconId: 'ic_ment',
    disabled: false,
    handleClick: handleCameraClick,
    requiredRole: 'provider',
  },
  {
    id: 'cash',
    title: '계좌번호',
    iconId: 'ic_cash',
    disabled: false,
    handleClick: handleCameraClick,
    requiredRole: 'provider',
  },
  {
    id: 'write_paper',
    title: '견적서 작성',
    iconId: 'ic_write_paper',
    disabled: false,
    handleClick: handleCameraClick,
    requiredRole: 'provider',
  },
  {
    id: 'edit_paper',
    title: '견적서 수정',
    iconId: 'ic_edit_paper',
    disabled: false,
    handleClick: handleCameraClick,
    requiredRole: 'provider',
  },
  {
    id: 'view_paper',
    title: '견적서 보기',
    iconId: 'ic_view_paper',
    disabled: false,
    handleClick: handleCameraClick,
    requiredRole: 'all',
  },
  {
    id: 'download_paper',
    title: '견적서 다운',
    iconId: 'ic_download_paper',
    disabled: false,
    handleClick: handleCameraClick,
    requiredRole: 'client',
  },
  {
    id: 'cancel',
    title: '예약 취소 신청',
    iconId: 'ic_cancel',
    disabled: false,
    handleClick: handleCameraClick,
    requiredRole: 'all',
  },
];
