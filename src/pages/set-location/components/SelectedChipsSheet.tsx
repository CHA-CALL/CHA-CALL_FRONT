import type { Region } from '@pages/set-location/constant/mocks';
import { MAX_SELECTED } from '@pages/set-location/constant/set-location';
import SelectChip from '@shared/components/select-chip/SelectChip';

interface SelectedChipsSheetProps {
  selectedLocationsId: Set<Region>;
  handleDeleteLocation: (_locaiton: Region) => void;
}

export default function SelectedChipsSheet({
  selectedLocationsId,
  handleDeleteLocation,
}: SelectedChipsSheetProps) {
  return (
    <div className='flex flex-col gap-[1rem] rounded-t-[1rem] px-[2rem] py-[1.1rem] bg-white shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.04)]'>
      <span className='title-sb-12'>
        <span className='text-primary-700'>{selectedLocationsId.size} </span>
        <span className='text-black'>/ {MAX_SELECTED}</span>
      </span>
      <div className='flex flex-wrap gap-[0.8rem]'>
        {[...selectedLocationsId].map(chip => (
          <SelectChip
            title={chip.name}
            handleDeleteChip={() => handleDeleteLocation(chip)}
          />
        ))}
      </div>
    </div>
  );
}
