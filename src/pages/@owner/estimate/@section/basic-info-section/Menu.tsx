import FormLayout from '@components/layout/form-layout/FormLayout';
import Textarea from '@components/ui/text-area/Textarea';
import ErrorText from '@form/error-text/ErrorText';
import { ESTIMATE_MAX_LENGTH } from '@pages/@owner/estimate/constants/estimate';

interface MenuProps {
  menu: string;
  updateMenu: (menu: string) => void;
  error?: string;
}

export default function Menu({ menu, updateMenu, error }: MenuProps) {
  return (
    <FormLayout isRequired={true} title='음식'>
      <Textarea
        placeholder='텍스트를 입력해주세요.'
        maxLength={ESTIMATE_MAX_LENGTH.menu.max}
        value={menu}
        handleChange={e => updateMenu(e.target.value)}
        className='h-[12rem]'
      />
      {error && <ErrorText text={error} />}
    </FormLayout>
  );
}
