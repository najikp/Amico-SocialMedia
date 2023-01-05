const initialState = {
    userDetails: null,
    error: false,
    loading: false,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "USER_DATA_PENDING":
        return {
          ...state,
          loading: true,
          error: false,
        };
      case "USER_DATA_SUCCESS":
        return {
          ...state,
          userDetails: { ...action.payload },
          loading: false,
          error: false,
        };
      case "USER_DATA_FAIL":
        return {
          ...state,
          userDetails: null,
          loading: false,
          error: true,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;