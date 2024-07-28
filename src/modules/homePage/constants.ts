//types
import {CarouselCard} from '@/components/carouselSection/types';
import {Blog} from '@/types/Blog';
import {Food} from '@prisma/client';

export const HOME_PAGE_CAROUSEL_CARDS: Array<CarouselCard> = [
  {
    title: 'Perfecto',
    text: 'Best Restaurant',
    image: 'https://preview.colorlib.com/theme/feliciano/images/bg_1.jpg.webp',
  },
  {
    title: 'Perfecto',
    text: 'Delicious Specialties',
    image: 'https://preview.colorlib.com/theme/feliciano/images/bg_2.jpg.webp',
  },
  {
    title: 'Perfecto',
    text: 'Nutritious & Tasty',
    image: 'https://preview.colorlib.com/theme/feliciano/images/bg_3.jpg.webp',
  },
];

export const STATS = [
  {
    label: 'Years of Experience',
    value: 15,
  },
  {
    label: 'Menus/Dish',
    value: 100,
  },
  {
    label: 'Staffs',
    value: 50,
  },
  {
    label: 'Happy Customers',
    value: 15000,
  },
];

export const FOOD_ITEMS: Array<Omit<Food, 'isDeleted' | 'createdAt' | 'updatedAt' | 'userId'>> = [
  {
    id: 'cljgri9uf002erl0odtf7m463',
    name: 'Caesar Salad',
    description:
      'Crisp romaine lettuce, garlic croutons, and parmesan cheese tossed in a tangy Caesar dressing.',
    pictures: 'https://example.com/caesar-salad.jpg',
    isVeg: true,
    inStock: true,
    price: {
      amount: '6.99',
      currency: 'USD',
      precision: null,
      __typename: 'Price',
    },
    category: 'LUNCH',
  },
  {
    id: 'cljgri9uf002frl0o5453ltvr',
    name: 'Mushroom Risotto',
    description: 'Creamy arborio rice cooked with mushrooms, onions, and parmesan cheese.',
    pictures: 'https://example.com/mushroom-risotto.jpg',
    isVeg: true,
    inStock: true,
    price: {
      amount: '12.99',
      currency: 'USD',
      precision: null,
      __typename: 'Price',
    },
    category: 'DINNER',
  },
  {
    id: 'cljgri9uf002grl0o3s705wnq',
    name: 'Chocolate Cake',
    description:
      'Decadent chocolate cake with layers of rich chocolate ganache, topped with chocolate shavings.',
    pictures: 'https://example.com/chocolate-cake.jpg',
    isVeg: true,
    inStock: true,
    price: {
      amount: '9.99',
      currency: 'USD',
      precision: null,
      __typename: 'Price',
    },
    category: 'DESSERT',
  },
  {
    id: 'cljgri9uf002irl0o6b1fettq',
    name: 'Chicken Alfredo Pasta',
    description: 'Creamy pasta dish with tender chicken, Parmesan cheese, and garlic sauce.',
    pictures: 'https://example.com/chicken-alfredo-pasta.jpg',
    isVeg: false,
    inStock: true,
    price: {
      amount: '1300',
      currency: 'USD',
      precision: 2,
      __typename: 'Price',
    },
    category: 'DINNER',
  },
  {
    id: 'cljgri9uf002jrl0o6a4969ww',
    name: 'Veggie Wrap',
    description: 'A healthy wrap filled with fresh vegetables, hummus, and a tangy dressing.',
    pictures: 'https://example.com/veggie-wrap.jpg',
    isVeg: true,
    inStock: true,
    price: {
      amount: '7.99',
      currency: 'USD',
      precision: null,
      __typename: 'Price',
    },
    category: 'LUNCH',
  },
];

export const BLOGS: Array<Blog> = [
  {
    id: '576382tdguyhd9823d',
    userId: '',
    thumbnailUrl: 'https://preview.colorlib.com/theme/feliciano/images/image_1.jpg.webp',
    title: 'Taste the delicious foods in Asia',
    htmlContent: '',
    createdOn: 364832409342,
    comments: [],
  },
  {
    id: '343278rdg28fgg283',
    userId: '',
    thumbnailUrl: 'https://preview.colorlib.com/theme/feliciano/images/image_2.jpg.webp',
    title: 'Taste the delicious foods in Asia',
    htmlContent: '',
    createdOn: 364832409342,
    comments: [],
  },
  {
    id: '328764fg84g748f3f',
    userId: '',
    thumbnailUrl: 'https://preview.colorlib.com/theme/feliciano/images/image_3.jpg.webp',
    title: 'Taste the delicious foods in Asia',
    htmlContent: '',
    createdOn: 364832409342,
    comments: [],
  },
];
