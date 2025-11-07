export type MenuItemConfig = {
  id: string;
  title: string;
  iconId: 'ic_camera';
  disabled: boolean;
  handleClick: () => void;
  requiredRole: 'provider' | 'client' | 'all';
};

const handleCameraClick = () => {};

export const ALL_MENU_ITEMS: MenuItemConfig[] = [
  {
    id: 'camera',
    title: '앨범',
    iconId: 'ic_camera',
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
    id: 'camera',
    title: '자주쓰는 문구',
    iconId: 'ic_camera',
    disabled: false,
    handleClick: handleCameraClick,
    requiredRole: 'provider',
  },
  {
    id: 'camera',
    title: '계좌번호',
    iconId: 'ic_camera',
    disabled: false,
    handleClick: handleCameraClick,
    requiredRole: 'provider',
  },
  {
    id: 'camera',
    title: '견적서 작성',
    iconId: 'ic_camera',
    disabled: false,
    handleClick: handleCameraClick,
    requiredRole: 'provider',
  },
  {
    id: 'camera',
    title: '견적서 수정',
    iconId: 'ic_camera',
    disabled: false,
    handleClick: handleCameraClick,
    requiredRole: 'provider',
  },
  {
    id: 'camera',
    title: '견적서 보기',
    iconId: 'ic_camera',
    disabled: false,
    handleClick: handleCameraClick,
    requiredRole: 'all',
  },
  {
    id: 'camera',
    title: '견적서 다운',
    iconId: 'ic_camera',
    disabled: false,
    handleClick: handleCameraClick,
    requiredRole: 'client',
  },
  {
    id: 'camera',
    title: '예약 취소 신청',
    iconId: 'ic_camera',
    disabled: false,
    handleClick: handleCameraClick,
    requiredRole: 'all',
  },
];
