"use client";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import useCart from "@/hooks/use-cart";
import { ProductCart } from "@/types";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CartItemProps {
  data: ProductCart;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(data.quantity);
  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const onPlus = () => {
    cart.increaseQuantity(data.id);
  };
  const onMinus = () => {
    if (quantity > 1) {
      cart.decreaseQuantity(data.id);
    }
  };

  useEffect(() => {
    setQuantity(data.quantity);
  }, [data.quantity]);

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex-1 flex flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">{data.name}</p>
          </div>
          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.color.name}</p>
            <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">
              {data.size.name}
            </p>
          </div>
          <Currency value={data.price} />
          <div className="flex">
            <label htmlFor="Quantity" className="sr-only">
              Quantity
            </label>

            <div className="flex items-center gap-1">
              <IconButton icon={<Minus size={15} />} onClick={onMinus} />

              <input
                type="number"
                id="Quantity"
                value={quantity}
                className="h-10 w-16 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
              />

              <IconButton icon={<Plus size={15} />} onClick={onPlus} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
