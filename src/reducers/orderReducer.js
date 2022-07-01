const ORDERSTATUS_LIST = "ORDERSTATUS_LIST";
const SHIPPING_ID = "SHIPPING_ID";
const BILLING_ID = "BILLING_ID";
const PAYMENT_METHOD = "PAYMENT_METHOD";
const CART_ITEM_IDS = "CART_ITEM_IDS";
const PRODUCT_IDS = "PRODUCT_IDS";
const SHIPPING_CHARGE = "SHIPPING_CHARGE";
const BUYNOW_PRODUCT = "BUYNOW_PRODUCT";


export const ordersStatusInitialState = {
  statues: [],
  billingAddress: null,
  shippingAddress: null,
  paymentMethod: null,
  cartItemIds: [],
  productIds:[],
  shippingCharge:null,
  buyNowProduct:null
};
export const orderReducer = (state, action) => {
  switch (action.type) {
    case ORDERSTATUS_LIST:
      return { ...state, statues: action.payload };
    case SHIPPING_ID:
      return { ...state, shippingAddress: action.payload };
    case BILLING_ID:
      return { ...state, billingAddress: action.payload };
    case PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case CART_ITEM_IDS:
      return {...state, cartItemIds: action.payload};
    case PRODUCT_IDS:
      return {...state, productIds: action.payload};
    case SHIPPING_CHARGE:
      return {...state, shippingCharge: action.payload}
    case BUYNOW_PRODUCT:
      return {...state, buyNowProduct: action.payload}
    default: {  
      return state;
    }
  }
};
