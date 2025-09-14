import { FOOD_TRUCK_CATEGORIES } from '@shared/constant/foodTruckCategory';

interface FoodTruckItemData {
  image: string;
  name: string;
  priceRange: string;
  minOrder: string;
  tags: string[];
  category: string;
}

export const mockFoodTruckData: FoodTruckItemData[] = [
  {
    image: 'https://placehold.co/80',
    name: '달마시안 푸드트럭',
    priceRange: '16,000-20,000',
    minOrder: '30',
    tags: ['피자', '양식'],
    category: FOOD_TRUCK_CATEGORIES[1],
  },
  {
    image: 'https://placehold.co/80',
    name: '말티즈 푸드트럭',
    priceRange: '6,000-12,000',
    minOrder: '15',
    tags: ['타코', '멕시칸'],
    category: FOOD_TRUCK_CATEGORIES[4],
  },
  {
    image: 'https://placehold.co/80',
    name: '푸들 푸드트럭',
    priceRange: '8,000-15,000',
    minOrder: '20',
    tags: ['치킨'],
    category: FOOD_TRUCK_CATEGORIES[2],
  },
  {
    image: 'https://placehold.co/80',
    name: '시바 푸드트럭',
    priceRange: '100,000-150,000',
    minOrder: '100',
    tags: ['중식', '일식', '한식'],
    category: FOOD_TRUCK_CATEGORIES[3],
  },
  {
    image: 'https://placehold.co/80',
    name: '닥스훈트 푸드트럭',
    priceRange: '1,000-11,000',
    minOrder: '1',
    tags: ['중식', '일식', '한식'],
    category: FOOD_TRUCK_CATEGORIES[1],
  },
  {
    image: 'https://placehold.co/80',
    name: '리트리버 푸드트럭',
    priceRange: '1,000-11,000',
    minOrder: '1',
    tags: ['중식', '일식', '한식'],
    category: FOOD_TRUCK_CATEGORIES[3],
  },
  {
    image: 'https://placehold.co/80',
    name: '말티푸 푸드트럭',
    priceRange: '1,000-11,000',
    minOrder: '1',
    tags: ['중식', '일식', '한식'],
    category: FOOD_TRUCK_CATEGORIES[3],
  },
];
