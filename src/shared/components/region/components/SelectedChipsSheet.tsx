import type { RegionResponse } from 'apis/data-contracts';

import SelectChip from '@ui/select-chip/SelectChip';
import { MAX_SELECTED } from '@shared/components/region/constant/region';

interface SelectedChipsSheetProps {
  selectedRegions: RegionResponse[];
  handleDeleteRegion: (_region: RegionResponse) => void;
}

export default function SelectedChipsSheet({
  selectedRegions,
  handleDeleteRegion,
}: SelectedChipsSheetProps) {
  return (
    <div className='flex flex-col gap-[1rem] rounded-t-[1rem] bg-white px-[2rem] py-[1.1rem] shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.04)]'>
      <span className='title-sb-12'>
        <span className='text-primary-700'>{selectedRegions.length} </span>
        <span className='text-black'>/ {MAX_SELECTED}</span>
      </span>
      <div className='flex flex-wrap gap-[0.8rem]'>
        {[...selectedRegions.values()].map(chip => (
          <SelectChip
            title={chip.name ?? ''}
            handleDeleteChip={() => handleDeleteRegion(chip)}
            key={chip.code}
          />
        ))}
      </div>
    </div>
  );
}
