import { type RegionResponse } from 'apis/data-contracts';

import DepthTitle from '@pages/set-location/components/(.)section/(.)depths/DepthTitle';
import Depth1Item from '@pages/set-location/components/(.)section/(.)depths/Depth1Item';
import Depth2Item from '@pages/set-location/components/(.)section/(.)depths/Depth2Item';
import Depth3Item from '@pages/set-location/components/(.)section/(.)depths/Depth3Item';

interface DepthSectionProps {
  depth1List: RegionResponse[];
  depth2List: RegionResponse[];
  depth3List: RegionResponse[];
  depth1: RegionResponse | null;
  depth2: RegionResponse | null;
  handleSelectDepth1: (_depth1Item: RegionResponse) => void;
  handleSelectDepth2: (_depth2Item: RegionResponse) => void;
  handleToggleLocation: (_item: RegionResponse) => void;
  selectedLocations: Map<number, RegionResponse>;
}

export default function DepthSection({
  depth1List,
  depth2List,
  depth3List,
  depth1,
  depth2,
  handleSelectDepth1,
  handleSelectDepth2,
  handleToggleLocation,
  selectedLocations,
}: DepthSectionProps) {
  return (
    <>
      <DepthTitle />
      <div className='flex w-full flex-1 flex-col overflow-y-auto scrollbar-hide'>
        <div className='grid flex-1 grid-cols-[1fr_1fr_1fr] overflow-hidden'>
          <div className='overflow-auto border-r border-grayscale-200 scrollbar-hide'>
            {depth1List?.map((item: RegionResponse) => (
              <Depth1Item
                title={item.name ?? ''}
                isSelected={item.code === depth1?.code}
                handleSelectDepth1={() => handleSelectDepth1(item)}
                key={item.code}
              />
            ))}
          </div>
          <div className='overflow-auto border-r border-grayscale-200 scrollbar-hide'>
            {depth2List?.map((item: RegionResponse) => (
              <Depth2Item
                title={item.name ?? ''}
                isSelected={item.code === depth2?.code}
                handleSelectDepth2={() => handleSelectDepth2(item)}
                key={item.code}
              />
            ))}
          </div>
          <div className='overflow-auto scrollbar-hide'>
            {depth3List?.map((item: RegionResponse) => {
              const fullName = item.name?.includes('전체')
                ? `${depth1?.name} ${item?.name}`
                : `${depth1?.name} ${depth2?.name} ${item.name}`;
              return (
                <Depth3Item
                  title={item.name ?? ''}
                  isSelected={selectedLocations.has(item.code ?? 0)}
                  handleSelectDepth3={() =>
                    handleToggleLocation({
                      name: fullName,
                      code: item.code,
                    })
                  }
                  key={item.code}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
