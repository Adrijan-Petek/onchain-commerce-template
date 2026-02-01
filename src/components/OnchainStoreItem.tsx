import type { Product } from 'src/types';
import Image from 'next/image';
import QuantityInput from './QuantityInput';

export default function OnchainStoreItem({ id, name, price, image }: Product) {
  const imageSize =
    typeof image === 'string'
      ? { width: 400, height: 400 }
      : { width: image.width, height: image.height };
  return (
    <div className="store-item mx-auto flex w-full flex-col rounded-md border border-gray-200 bg-white p-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] sm:mx-0">
      <div className="mb-1 flex items-start justify-between">
        <h2 className="font-regular text-[11px] uppercase tracking-wide text-gray-700">
          {name}
        </h2>
      </div>
      <div className="flex h-36 items-center justify-center sm:h-40 md:h-44">
        <Image
          src={image}
          alt={name}
          {...imageSize}
          className="mx-auto h-full w-auto object-contain"
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="font-regular text-[11px] text-gray-900">
          {price.toFixed(2)} USDC
        </p>
        <QuantityInput productId={id} />
      </div>
    </div>
  );
}
