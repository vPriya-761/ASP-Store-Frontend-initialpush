const AUTH_TOKEN = "AUTH_TOKEN";
export const authInitialState = {
  authToken: null,
};
export const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_TOKEN:
      return { ...state, authToken: action.payload };
    default: {
      return state;
    }
  }
};

