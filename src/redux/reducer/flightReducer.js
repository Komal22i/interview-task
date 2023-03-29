const initialState = {
  isLogin: false,
};

// Reducers (Modifies The State And Returns A New State)
const flightReducer = (state = initialState, action) => {
  // console.log('actions', action);
  switch (action.type) {
    case "VALUE_CHANGED":
      return { ...state, [`${action.key}`]: action.value };
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default flightReducer;
