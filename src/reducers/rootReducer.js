import { cartInitialState, cartReducer } from "./cartReducer";
import combineReducers from "./combineReducers";
import { layoutInitialState, layoutReducer } from "./layoutReducer";
import { authInitialState, authReducer } from "./authReducer";
import { catagoriesInitialState, catagoriesReducer } from "./catagoriesReducer";
import { brandInitialState, brandReducer } from "./brandReducer";
import { ordersStatusInitialState, orderReducer } from "./orderReducer";
import {
  orderSummeryInitialState,
  orderSummeryReducer,
} from "./orderSummeryReducer";
export const initialState = {
  layout: layoutInitialState,
  cart: cartInitialState,
  authToken: authInitialState,
  catagories: catagoriesInitialState,
  brands: brandInitialState,
  orderStatus: ordersStatusInitialState,
  summary: orderSummeryInitialState,
};
export const rootReducer = combineReducers({
  layout: layoutReducer,
  cart: cartReducer,
  authToken: authReducer,
  catagories: catagoriesReducer,
  brands: brandReducer,
  orderStatus: orderReducer,
  summary: orderSummeryReducer,
});
