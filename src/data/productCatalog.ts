export type ProductCatalogItem = {
  id: string;
  name: string;
  price: number;
};

export const PRODUCT_CATALOG: ProductCatalogItem[] = [
  { id: 'product1', name: `'BUILDER' JACKET`, price: 0.04 },
  { id: 'product2', name: `'DND, I'M BUILDING' AIRPODS`, price: 0.01 },
  { id: 'product3', name: `'CAFFEINATED TO BUILD' MUG`, price: 0.02 },
  { id: 'product4', name: `'HYDRATED TO BUILD' BOTTLE`, price: 0.01 },
];
