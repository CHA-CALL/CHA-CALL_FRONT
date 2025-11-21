import ErrorText from '@components/form/error-text/ErrorText';
import FormLayout from '@components/layout/form-layout/FormLayout';
import Input from '@components/ui/input/Input';
import { ESTIMATE_MAX_LENGTH } from '@pages/@owner/estimate/constants/estimate';

interface RegionSectionProps {
  location: string;
  detailLocation: string;
  updateLocation: (_location: string) => void;
  updateDetailLocation: (_detailLocation: string) => void;
  error?: string;
}

export default function RegionSection({
  location,
  detailLocation,
  updateLocation,
  updateDetailLocation,
  error,
}: RegionSectionProps) {
  return (
    <FormLayout
      isRequired={true}
      title='위치'
      description='행사 당일에 차질이 없도록 정확히 기입해주세요!'
    >
      <div className='flex w-full items-center gap-[1.2rem]'>
        <span className='title-sb-12 text-grayscale-700 whitespace-nowrap'>
          시/군/구
        </span>
        <Input
          placeholder='Ex) 서울특별시 광진구 화양동'
          error={!!error}
          value={location}
          onChange={e => updateLocation(e.target.value)}
          maxLength={ESTIMATE_MAX_LENGTH.location.max}
          className='flex-shrink-1 min-w-0'
        />
      </div>
      <div className='flex items-center gap-[1.2rem]'>
        <span className='title-sb-12 text-grayscale-700 whitespace-nowrap'>
          상세 주소
        </span>
        <Input
          placeholder='Ex) 차콜로 123'
          value={detailLocation}
          onChange={e => updateDetailLocation(e.target.value)}
          className='flex-shrink-1 min-w-0'
        />
      </div>
      {error && <ErrorText text={error} />}
    </FormLayout>
  );
}
