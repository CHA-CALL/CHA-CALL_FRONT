import { useState } from 'react';
import ExtensionMenuItem from './components/ExtensionMenuItem';
import { Icon } from '@shared/components/icon/Icon';

export default function ChatExtensionMenu() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [active, setActive] = useState(false);
  return (
    <div>
      <div>+ 메세지 입력 탭 '+'</div>
      <div>
        확장 버튼 모음
        <ExtensionMenuItem
          title={'카메라'}
          icon={<Icon name={'ic_camera'} />}
          isDisabled={active}
          handleClick={() => {
            setActive(prev => !prev);
          }}
        />
      </div>
    </div>
  );
}
