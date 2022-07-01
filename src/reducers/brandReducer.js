const BRANDS_LIST = "BRANDS_LIST";

export const brandInitialState = {
  brandList: [],
};
export const brandReducer = (state, action) => {
  switch (action.type) {
    case BRANDS_LIST:
      return { ...state, brandList: action.payload };

    default: {
      return state;
    }
  }
};
