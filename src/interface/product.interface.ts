// Type for the Category
interface ICategoryProduct {
  categoryId: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface IProduct {
  productId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  productPhoto: string;
  categoryId: string;
  category: ICategoryProduct;
}

