import { useCallback } from 'react';
import type {
  Quantities,
  QuantityInputButtonReact,
  QuantityInputReact,
} from 'src/types';
import { useOnchainStoreContext } from './OnchainStoreProvider';
import PlusSvg from 'src/svg/PlusSvg';
import MinusSvg from 'src/svg/MinusSvg';

function QuantityInputButton({
  onClick,
  svg,
  label,
}: QuantityInputButtonReact) {
  return (
    <button
      className="flex h-7 w-7 items-center justify-center rounded border border-gray-200 bg-white p-0 text-gray-700 shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:border-gray-300 hover:bg-gray-50"
      onClick={onClick}
      type="button"
    >
      <span className="sr-only">{label}</span>
      {svg}
    </button>
  );
}

export default function QuantityInput({ productId }: QuantityInputReact) {
  const { quantities, setQuantities } = useOnchainStoreContext();

  const currentItemQuantity = quantities[productId] || 0;

  const handleIncrement = useCallback(() => {
    setQuantities((prev: Quantities) => {
      const nextQuantity = (prev[productId] || 0) + 1;
      return { ...prev, [productId]: nextQuantity };
    });
  }, [productId, setQuantities]);

  const handleDecrement = useCallback(() => {
    setQuantities((prev: Quantities) => {
      const newQuantity = Math.max(0, (prev[productId] || 0) - 1);
      return { ...prev, [productId]: newQuantity };
    });
  }, [productId, setQuantities]);

  return (
    <div className="flex items-center space-x-2">
      <QuantityInputButton
        label="Decrease quantity"
        svg={<MinusSvg />}
        onClick={handleDecrement}
      />
      <span className="w-7 text-center font-medium text-xs">
        {currentItemQuantity}
      </span>
      <QuantityInputButton
        label="Increase quantity"
        svg={<PlusSvg />}
        onClick={handleIncrement}
      />
    </div>
  );
}
