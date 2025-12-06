import FormLayout from '@components/layout/form-layout/FormLayout';
import ErrorText from '@form/error-text/ErrorText';
import Textarea from '@components/ui/text-area/Textarea';
import { ESTIMATE_MAX_LENGTH } from '@pages/@owner/estimate/constants/estimate';

interface EtcProps {
  etc: string;
  updateEtc: (_etc: string) => void;
  error?: string;
}

export default function Etc({ etc, updateEtc, error }: EtcProps) {
  return (
    <FormLayout isRequired={false} title='기타 요청 사항' isLast={true}>
      <Textarea
        placeholder='텍스트를 입력해주세요.'
        value={etc}
        handleChange={e => updateEtc(e.target.value)}
        maxLength={ESTIMATE_MAX_LENGTH.etc.max}
        className='min-h-[34rem]'
      />
      {error && <ErrorText text={error} />}
    </FormLayout>
  );
}
