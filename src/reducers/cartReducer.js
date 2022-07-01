const CHANGE_CART_AMOUNT = "CHANGE_CART_AMOUNT";
const CART_LIST = "CART_LIST";
const UPDATE_CART_LIST = "UPDATE_CART_LIST";
export const cartInitialState = {
  cartList: [],
  updateCartList: false,
};
export const cartReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_CART_AMOUNT:
      let cartList = state?.cartList;
      let cartItem = action.payload;

      let exist = cartList?.find((item) => item.cart_id === cartItem.cart_id);
      if (cartItem.quantity < 1) {
        return {
          cartList: cartList?.filter(
            (item) => item.cart_id !== cartItem.cart_id
          ),
        };
      } else if (exist) {
        return {
          cartList: cartList?.map((item) => {
            if (item.cart_id === cartItem.cart_id)
              return { ...item, quantity: cartItem.quantity };
            else return item;
          }),
        };
      } else
        return {
          cartList: [...cartList, cartItem],
        };
    case CART_LIST:
      return { ...state, cartList: action.payload };
    case UPDATE_CART_LIST:
      return { ...state, updateCartList: action.payload };

    default: {
      return state;
    }
  }
};
