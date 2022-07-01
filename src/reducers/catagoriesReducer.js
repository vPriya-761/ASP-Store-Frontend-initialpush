const CATAGORIGES_LIST = "CATAGORIGES_LIST"


export const catagoriesInitialState = {
    catagoriesList:[]
  };
  export const catagoriesReducer = (state, action) => {
    switch (action.type) {
  
      case CATAGORIGES_LIST:
        return { ...state, catagoriesList: action.payload };
  
      default: {
        return state;
      }
    }
  };
  