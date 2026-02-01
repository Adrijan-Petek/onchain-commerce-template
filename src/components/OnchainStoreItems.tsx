import OnchainStoreItem from './OnchainStoreItem';
import { useOnchainStoreContext } from './OnchainStoreProvider';

export default function OnchainStoreItems() {
  const { products } = useOnchainStoreContext();

  return (
    <div className="grow p-4 md:p-5">
      <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
        {products?.map((item) => (
          <OnchainStoreItem {...item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
