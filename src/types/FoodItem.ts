export type FoodItem = {
  id: string;
  title: string;
  description: string;
  pricePerUnit: number;
  amountPerUnit: {
    quantity: number;
    unit: string;
  };
  primaryImageUrl: string;
  secondaryImagesUrls: Array<string>;
  name: string;
};
