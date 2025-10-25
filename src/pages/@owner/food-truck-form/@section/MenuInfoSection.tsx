import { useMenuInfo } from '../hooks/use-menu-info';
import { useNavigate } from 'react-router-dom';
import FormLayout from '../components/FormLayout';
import Button from '@shared/components/button/Button';
import { FOOD_CATEGORIES } from '@shared/constant/food-categories';
import PageSwitchButton from '../components/PageSwitchButton';
import { ROUTES } from '@router/constant/routes';
import { useFoodTruckForm } from '../hooks/use-food-truck-form';

function MenuInfoSection() {
  const { menuCategories, updateMenuCategories } = useMenuInfo();

  return (
    <>
      <FormLayout
        isRequired={true}
        title='판매음식 카테고리'
        subTitle='중복 선택 가능'
      >
        <div className='flex flex-wrap gap-[0.8rem]'>
          {Object.values(FOOD_CATEGORIES).map(foodCategory => (
            <Button
              buttonStyle={
                menuCategories.some(
                  (category: string) => category === foodCategory
                )
                  ? 'selected2'
                  : 'default'
              }
              handleClickButton={() => updateMenuCategories(foodCategory)}
              variant='chip'
              key={foodCategory}
              className='w-fit'
            >
              {foodCategory}
            </Button>
          ))}
        </div>
      </FormLayout>
    </>
  );
}

function MenuInfoSectionContent() {
  const navigate = useNavigate();
  const { formData } = useFoodTruckForm(undefined);
  return (
    <FormLayout
      isRequired={true}
      title='메뉴 정보'
      description='최소 1개의 음식을 등록해주세요.'
    >
      <PageSwitchButton
        isSelected={formData.menus.length > 0}
        text='메뉴를 등록해주세요.'
        handleClick={() => navigate(ROUTES.MENU_LIST)}
      />
    </FormLayout>
  );
}

export { MenuInfoSection, MenuInfoSectionContent };
