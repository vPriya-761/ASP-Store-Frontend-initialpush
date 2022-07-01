const CHANGE_SUMMARY_AMOUNT = "CHANGE_SUMMARY_AMOUNT";
const SUMMERY_LIST = "SUMMERY_LIST"

export const orderSummeryInitialState = {
  orderSummery: [],
};

export const orderSummeryReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_SUMMARY_AMOUNT:
      let orderSummery = state?.orderSummery || [];
      let cartItem = action.payload;

      let exist = orderSummery?.find(
        (item) => item.cart_id === cartItem.cart_id
      );
      if (cartItem.quantity < 1) {
        return {
          orderSummery: orderSummery?.filter(
            (item) => item.cart_id !== cartItem.cart_id
          ),
        };
      } else if (exist) {
        return {
          orderSummery: orderSummery?.map((item) => {
            if (item.cart_id === cartItem.cart_id)
              return { ...item, quantity: cartItem.quantity };
            else return item;
          }),
        };
      } else
        return {
          orderSummery: [...orderSummery, cartItem],
        };
    case SUMMERY_LIST:
        return {...state, orderSummery: action.payload};
    default: {
      return state;
    }
  }
};
