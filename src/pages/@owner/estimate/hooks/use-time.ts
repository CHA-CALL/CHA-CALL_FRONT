import type { EstimateFormData } from '@pages/@owner/estimate/utils/estimate.schema';
import type { UseFormSetValue } from 'react-hook-form';

//time, date 관련 로직
interface UseEstimateTimeProps {
  formData: EstimateFormData;
  setValue: UseFormSetValue<EstimateFormData>;
}

export const useEstimateTime = ({
  formData,
  setValue,
}: UseEstimateTimeProps) => {
  //time 관련 로직
  const updateStartActiveTime = (startActiveTime: string) => {
    setValue(
      'activeTime',
      { ...formData.activeTime, startActiveTime },
      { shouldValidate: true }
    );
  };

  const updateEndActiveTime = (endActiveTime: string) => {
    setValue(
      'activeTime',
      { ...formData.activeTime, endActiveTime },
      { shouldValidate: true }
    );
  };

  return {
    updateStartActiveTime,
    updateEndActiveTime,
  };
};
