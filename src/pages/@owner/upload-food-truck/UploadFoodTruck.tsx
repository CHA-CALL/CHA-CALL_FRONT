import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import type { ImageData } from '@pages/@owner/upload-food-truck/hooks/use-food-truck-image';
import { useQueryClient } from '@tanstack/react-query';
import { FOOD_TRUCK_IMAGE_QUERY_KEY } from '@shared/querykey/food-trucks/food-truck-image';

// TODO: 푸드트럭 사진 등록 테스트용
export default function UploadFoodTruck() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const queryKey = FOOD_TRUCK_IMAGE_QUERY_KEY.IMAGES();
  const foodTruckImages = queryClient.getQueryData<ImageData[]>(queryKey) || [];

  const handleUploadImage = () => {
    navigate(ROUTES.UPLOAD_FOOD_TRUCK_IMAGES);
  };

  return (
    <div className='flex flex-col items-center justify-center p-[2rem]'>
      {foodTruckImages.length > 0 ? (
        <>
          <p className='mb-[2rem]'>사진이 등록되었습니다.</p>
          {foodTruckImages.map((image, index) => (
            <div key={index} className='border p-[1rem] max-w-full'>
              <p>이미지 {index+1}</p>
              <p>File Name: {image.file.name}</p>
              <p>File Type: {image.file.type}</p>
              <p className='break-words'>Presigned URL: {image.presignedUrl}</p>
            </div>
          ))}
        </>
      ) : (
        <button type='button' onClick={handleUploadImage}>
          사진을 등록해주세요.
        </button>
      )}
    </div>
  );
}
