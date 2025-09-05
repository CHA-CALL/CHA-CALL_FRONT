import { useState } from 'react';
import ButtonTab from './ButtonTab';

interface ButtonTabGroupProps {
  tabs: string[]
  defaultActiveIndex?: number
  onTabChange?: (index: number) => void
}

export default function ButtonTabGroup({
  tabs,
  defaultActiveIndex = 0,
  onTabChange,
}: ButtonTabGroupProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveIndex);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    onTabChange?.(index);
    console.info(`Tab changed to: ${tabs[index]}`);
  };

  return (
    <div className={'flex flex-row border-b border-grayscale-100'}>
      {tabs.map((tab, index) => (
        <ButtonTab
          key={index}
          isActive={activeTab === index}
          onClick={() => handleTabClick(index)}
        >
          {tab}
        </ButtonTab>
      ))}
    </div>
  );
}
