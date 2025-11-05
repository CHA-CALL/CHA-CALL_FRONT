import Loading from '@layout/loading/Loading';

interface AgreementSectionProps {
  termAgreed: boolean | undefined;
}

export default function AgreementSection({
  termAgreed,
}: AgreementSectionProps) {
  if (termAgreed === undefined) {
    return <Loading />;
  }

  return (
    <div className='border-grayscale-200 flex flex-row items-center justify-between rounded-[1.6rem] border px-[1.8rem] py-[1.6rem]'>
      <div className='flex flex-row gap-[0.8rem]'>
        <span className='text-grayscale-900 caption-m-12'>
          개인정보수집 및 이용 동의 - 푸드트럭 추천
          <span className='text-grayscale-500'> (선택)</span>
        </span>
      </div>
      <span className='body-sb-11 text-primary-700'>
        {termAgreed ? '동의함' : '동의안함'}
      </span>
    </div>
  );
}
