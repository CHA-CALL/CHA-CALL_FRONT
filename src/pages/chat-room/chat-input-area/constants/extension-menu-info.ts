import { ROLE, type Role } from '@constant/role';

export type MenuKey =
  | 'gallery'
  | 'camera'
  | 'view_paper'
  | 'cancel'
  | 'download_paper'
  | 'ment'
  | 'cash'
  | 'write_paper'
  | 'edit_paper';

export type MenuIconId = `ic_${MenuKey}`;

export interface MenuItemConfig {
  key: MenuKey;
  title: string;
  iconId: MenuIconId;
  roles: Role[];
}

export const ALL_MENU_ITEMS: MenuItemConfig[] = [
  // 공통 메뉴
  {
    key: 'gallery',
    title: '앨범',
    iconId: 'ic_gallery',
    roles: [ROLE.CLIENT, ROLE.PROVIDER],
  },
  {
    key: 'camera',
    title: '카메라',
    iconId: 'ic_camera',
    roles: [ROLE.CLIENT, ROLE.PROVIDER],
  },
  {
    key: 'view_paper',
    title: '견적서 보기',
    iconId: 'ic_view_paper',
    roles: [ROLE.CLIENT, ROLE.PROVIDER],
  },
  {
    key: 'cancel',
    title: '예약 취소 신청',
    iconId: 'ic_cancel',
    roles: [ROLE.CLIENT, ROLE.PROVIDER],
  },
  // Client 전용
  {
    key: 'download_paper',
    title: '견적서 다운',
    iconId: 'ic_download_paper',
    roles: [ROLE.CLIENT],
  },
  // Provider 전용
  {
    key: 'ment',
    title: '자주쓰는 문구',
    iconId: 'ic_ment',
    roles: [ROLE.PROVIDER],
  },
  {
    key: 'cash',
    title: '계좌번호',
    iconId: 'ic_cash',
    roles: [ROLE.PROVIDER],
  },
  {
    key: 'write_paper',
    title: '견적서 작성',
    iconId: 'ic_write_paper',
    roles: [ROLE.PROVIDER],
  },
  {
    key: 'edit_paper',
    title: '견적서 수정',
    iconId: 'ic_edit_paper',
    roles: [ROLE.PROVIDER],
  },
];
