import FormLayout from '@components/layout/form-layout/FormLayout';
import Button from '@ui/button/Button';
import { useCategories } from '@pages/@owner/food-truck-form/hooks/use-categories';
import { FOOD_CATEGORIES } from '@constant/food-categories';

export default function MenuCategory() {
  const { menuCategories, updateMenuCategories } = useCategories();

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
