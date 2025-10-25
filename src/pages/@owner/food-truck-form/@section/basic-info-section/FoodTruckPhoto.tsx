import FormLayout from '@pages/@owner/food-truck-form/components/FormLayout';
import PageSwitchButton from '@pages/@owner/food-truck-form/components/PageSwitchButton';
import { useBasicInfo } from '@pages/@owner/food-truck-form/hooks/use-basic-info';
export default function FoodTruckPhoto() {
  const { photoUrls, handleClickRouteToUploadFoodTruckImages } = useBasicInfo();
  return (
    <FormLayout
      isRequired={true}
      title='푸드트럭 사진'
      description='첫번째 사진이 메인 사진으로 노출됩니다.'
    >
      <PageSwitchButton
        isSelected={photoUrls.length > 0 ? true : false}
        text={
          photoUrls.length > 0
            ? '사진이 등록되었습니다.'
            : '푸드트럭 사진을 등록해주세요.'
        }
        handleClick={handleClickRouteToUploadFoodTruckImages}
      />
    </FormLayout>
  );
}
