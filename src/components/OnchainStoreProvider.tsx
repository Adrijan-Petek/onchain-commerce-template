import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { OnchainStoreContextType, Product } from '../types';
import jacketImage from '../images/jacket.png';
import airpodsImage from '../images/airpods.png';
import mugImage from '../images/mug.png';
import bottleImage from '../images/bottle.png';
import { PRODUCT_CATALOG } from 'src/data/productCatalog';

const emptyContext = {} as OnchainStoreContextType;

const OnchainStoreContext =
  createContext<OnchainStoreContextType>(emptyContext);

type OnchainStoreProviderReact = {
  children: ReactNode;
};

const productImages: Record<string, Product['image']> = {
  product1: jacketImage,
  product2: airpodsImage,
  product3: mugImage,
  product4: bottleImage,
};

const products: Product[] = PRODUCT_CATALOG.map((product) => ({
  ...product,
  image: productImages[product.id],
}));

export function OnchainStoreProvider({ children }: OnchainStoreProviderReact) {
  const [quantities, setQuantities] = useState<
    OnchainStoreContextType['quantities']
  >({});
  const value = useMemo(() => {
    return {
      quantities,
      setQuantities,
      products,
    };
  }, [quantities]);

  return (
    <OnchainStoreContext.Provider value={value}>
      {children}
    </OnchainStoreContext.Provider>
  );
}

export function useOnchainStoreContext() {
  return useContext(OnchainStoreContext);
}
