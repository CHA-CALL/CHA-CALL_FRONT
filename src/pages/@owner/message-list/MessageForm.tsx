import ConfirmModal from '@components/ui/modal-confirm/ConfirmModal';
import { zodResolver } from '@hookform/resolvers/zod';
import useToast from '@hooks/use-toast';
import { Icon } from '@icon/Icon';
import Loading from '@layout/loading/Loading';
import Navigation from '@layout/navigation/Navigation';
import { usePostOwnerChatTemplates } from '@pages/@owner/message-list/hooks/use-owner-message';
import {
  chatTemplateSchema,
  type ChatTemplateFormType,
} from '@pages/@owner/message-list/schemas/message-list.schema';
import Button from '@ui/button/Button';
import Textarea from '@ui/text-area/Textarea';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function MessageForm() {
  const navigate = useNavigate();
  const MAX_LENGTH = 500;
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: postChatTemplate, isPending } = usePostOwnerChatTemplates();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<ChatTemplateFormType>({
    resolver: zodResolver(chatTemplateSchema),
    mode: 'onChange',
    defaultValues: {
      content: '',
    },
  });

  const contentValue = watch('content');

  const onSubmit = (data: ChatTemplateFormType) => {
    postChatTemplate(data.content, {
      onSuccess: () => {
        toast.success('메시지가 성공적으로 저장되었습니다.');
        navigate(-1);
      },
      onError: () => {
        toast.error('메시지 저장에 실패했습니다.');
      },
    });
  };

  const handleClickBack = () => {
    if (contentValue.trim().length > 0) {
      setIsOpen(true);
    } else {
      navigate(-1);
    }
  };

  const handleClickCancel = () => {
    setIsOpen(false);
  };

  const handleClickConfirm = () => {
    setIsOpen(false);
    navigate(-1);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  if (isPending) {
    return <Loading />;
  }

  const { onChange, ...restRegister } = register('content');

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        handleClose={handleCloseModal}
        title='저장하지 않고 나가시겠습니까?'
        description={`작성 중인 내용은 저장되지 않으며, \n나가면 모두 삭제됩니다.`}
        handleConfirm={handleClickConfirm}
        handleCancel={handleClickCancel}
      />
      <Navigation
        centerContent='자주 쓰는 메세지 설정'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <div className='flex flex-col p-[2rem]'>
        <Textarea
          placeholder='텍스트를 입력해주세요.'
          maxLength={MAX_LENGTH}
          handleChange={onChange}
          value={contentValue}
          {...restRegister}
        />
      </div>
      <footer className='fixed-center bottom-[0] bg-white px-[2rem] py-[1.7rem]'>
        <Button
          variant='cta'
          buttonStyle={!isValid ? 'disabled' : 'active'}
          className='h-[5.4rem]'
          handleClickButton={handleSubmit(onSubmit)}
          type='submit'
          disabled={!isValid}
        >
          저장하기
        </Button>
      </footer>
    </>
  );
}
