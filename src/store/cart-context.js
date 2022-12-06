import { createContext, useContext } from "react";

export const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

const useCart = () => useContext(CartContext);

export { useCart };
