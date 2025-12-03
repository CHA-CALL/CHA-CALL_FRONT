import Information from '@shared/components/information/Information';

export default function UploadDescription() {
  return (
    <div className='flex w-full flex-col items-start justify-start gap-[1.2rem] p-[2rem]'>
      <div className='flex w-full flex-col items-start justify-start gap-[0.2rem]'>
        <p className='title-sb-16 grayscale-900'>
          푸드트럭 사진 등록
        </p>
        <p className='caption-m-11 grayscale-500'>
          사진은 순서대로 등록해주세요. 첫 번째 사진이 썸네일로 보여요!
        </p>
      </div>
      <Information
        iconId='ic_check'
        text='드래그하여 대표 이미지 설정 및 순서를 조정해보세요!'
        className='w-full'
      />
    </div>
  );
}
