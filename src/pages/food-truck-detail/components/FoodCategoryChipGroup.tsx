interface FoodCategoryChipGroupProps {
  categories: string[];
}

export default function FoodCategoryChipGroup({
  categories,
}: FoodCategoryChipGroupProps) {
  return (
    <div className='flex flex-row flex-wrap gap-[0.8rem]'>
      {categories.map((category, index) => (
        <div
          key={`${category}-${index}`}
          className='flex h-[2.5rem] w-[5.8rem] items-center justify-center rounded-[0.6rem] bg-grayscale-100 text-grayscale-700 caption-m-12'
        >
          {category}
        </div>
      ))}
    </div>
  );
}
