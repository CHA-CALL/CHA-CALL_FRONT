import type { RegionResponse } from 'apis/data-contracts';

import SelectChip from '@shared/components/ui/select-chip/SelectChip';
import { MAX_SELECTED } from '@pages/set-location/constant/location';

interface SelectedChipsSheetProps {
  selectedLocations: Map<number, RegionResponse>;
  handleDeleteLocation: (_location: RegionResponse) => void;
}

export default function SelectedChipsSheet({
  selectedLocations,
  handleDeleteLocation,
}: SelectedChipsSheetProps) {
  return (
    <div className='flex flex-col gap-[1rem] rounded-t-[1rem] bg-white px-[2rem] py-[1.1rem] shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.04)]'>
      <span className='title-sb-12'>
        <span className='text-primary-700'>{selectedLocations.size} </span>
        <span className='text-black'>/ {MAX_SELECTED}</span>
      </span>
      <div className='flex flex-wrap gap-[0.8rem]'>
        {[...selectedLocations.values()].map(chip => (
          <SelectChip
            title={chip.name ?? ''}
            handleDeleteChip={() => handleDeleteLocation(chip)}
            key={chip.code}
          />
        ))}
      </div>
    </div>
  );
}
