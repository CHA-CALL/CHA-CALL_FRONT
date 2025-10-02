import { ROUTES } from '@router/constant/routes';
import { Icon } from '@shared/components/icon/Icon';

interface SettingMenuSectionProps {
  isProvider: boolean;
  handleNavigateTo: (_navigateTo: string) => void;
}

interface SettingList {
  menu: string;
  navigateTo: string;
}

export default function SettingMenuSection({
  isProvider,
  handleNavigateTo,
}: SettingMenuSectionProps) {
  // TODO: 추가된 페이지 경로 설정
  const settingList: SettingList[] = isProvider
    ? [
        {
          menu: '예약내역',
          navigateTo: ROUTES.RESERVATION_HISTORY,
        },
        {
          menu: '나의 푸드트럭',
          navigateTo: ROUTES.MESSAGE_LIST,
        },
        {
          menu: '자주 쓰는 채팅 설정',
          navigateTo: ROUTES.MESSAGE_LIST,
        },
        {
          menu: '결제관리',
          navigateTo: ROUTES.MESSAGE_LIST,
        },
      ]
    : [
        {
          menu: '예약내역',
          navigateTo: ROUTES.RESERVATION_HISTORY,
        },
        {
          menu: '저장한 푸드트럭',
          navigateTo: ROUTES.MESSAGE_LIST,
        },
      ];

  return (
    <div className='flex flex-col gap-[1rem]'>
      <h4 className='text-grayscale-500 title-sb-12 mb-[0.3rem]'>계정 관리</h4>
      {settingList.map(setting => (
        <button
          key={setting.menu}
          type='button'
          className='flex flex-row items-center justify-between px-[0.6rem] py-[1.2rem]'
          onClick={() => handleNavigateTo(setting.navigateTo)}
        >
          <span className='text-grayscale-900 title-sb-14'>{setting.menu}</span>
          <Icon
            name='ic_next'
            width={18}
            height={18}
            className='text-grayscale-500'
          />
        </button>
      ))}
    </div>
  );
}
