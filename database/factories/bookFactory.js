import { faker } from '@faker-js/faker';

export const createBookFactory = (categoryId, subcategoryId = null) => {
  return {
    category_id: categoryId,
    subcategory_id: subcategoryId,
    title: faker.commerce.productName(),
    author: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    price: parseFloat(faker.commerce.price({ min: 40000, max: 250000, dec: 2 })),
    stock: faker.number.int({ min: 10, max: 100 }),
    cover_image: '/storage/assets/images/uploads/covers/ex.png',
    keywords: `${faker.word.sample()}, ${faker.word.sample()}, ${faker.word.sample()}`
  };
};
