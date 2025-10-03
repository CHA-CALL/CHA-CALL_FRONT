import { useAtomValue } from 'jotai';
import { ToastDataAtom } from '@utils/toast';
import { CustomToast } from '@shared/components/custom-toast/CustomToast';

const ToastContainer = () => {
  const toast = useAtomValue(ToastDataAtom);

  return <div>{toast && <CustomToast {...toast} />}</div>;
};

export default ToastContainer;
