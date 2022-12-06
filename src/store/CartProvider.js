import { useReducer } from "react";
import { CartContext } from "./cart-context";
import { ADD_TO_CART, REMOVE_FROM_CART } from "./action";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, { type, payload }) => {
  if (type === ADD_TO_CART) {
    const updatedTotalAmount =
      state.totalAmount + payload.price * payload.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === payload.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + payload.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(payload);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (type === REMOVE_FROM_CART) {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === payload
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updateTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== payload);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updateTotalAmount,
    };
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemCartHandler = (item) => {
    dispatchCartAction({ type: ADD_TO_CART, payload: item });
  };

  const removeItemCartHandler = (id) => {
    dispatchCartAction({ type: REMOVE_FROM_CART, payload: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemCartHandler,
    removeItem: removeItemCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
