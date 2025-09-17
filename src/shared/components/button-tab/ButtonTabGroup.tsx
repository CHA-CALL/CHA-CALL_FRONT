import { useState } from 'react';
import ButtonTab from '@shared/components/button-tab/ButtonTab';

interface Tab {
  id: string;
  label: string;
}

interface ButtonTabGroupProps {
  tabs: Tab[];
  defaultActiveId?: string;
  handleTabChange?: (_tabId: string) => void;
}

export default function ButtonTabGroup({
  tabs,
  defaultActiveId,
  handleTabChange,
}: ButtonTabGroupProps) {
  const [activeTabId, setActiveTabId] = useState(
    defaultActiveId || tabs[0]?.id
  );

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
    handleTabChange?.(tabId);
  };

  return (
    <div className={'border-grayscale-100 flex flex-row border-b'}>
      {tabs.map(tab => (
        <ButtonTab
          key={tab.id}
          isActive={activeTabId === tab.id}
          handleClickTab={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </ButtonTab>
      ))}
    </div>
  );
}
