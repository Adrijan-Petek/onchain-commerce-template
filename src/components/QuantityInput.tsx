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
      className="flex h-8 w-8 items-center justify-center rounded border border-gray-200 p-0"
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
      <span className="w-8 text-center font-medium text-sm">
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
