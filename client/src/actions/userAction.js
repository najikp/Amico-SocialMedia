import * as UserApi from '../api/UserRequest'


export const getUserDetails = (id) => async (dispatch) => {
    dispatch({ type: "USER_DATA_PENDING" });
    try {
      const response = await UserApi.getUserDetails(id);
      dispatch({ type: "USER_DATA_SUCCESS", payload: response.data });
    } catch (err) {
      if (err.response?.data?.expired) {
        return dispatch({ type: "LOGOUT" });
      }
      dispatch({ type: "USER_DATA_FAIL" });
      console.log(err);
    }
  };

export const updateUser=(id,formData)=>async(disptch)=>{
    disptch({type:'UPDATING_START'})
    try {
        const {data}=await UserApi.updateUser(id,formData);
        disptch({type:'UPDATING_SUCCESS', data:data})
    } catch (error) {
        disptch({type:'UPDATING_FAIL'})
    }
    
}

export const followUser=(id,data)=>async(dispatch)=>{
    dispatch({type:'FOLLOW_USER'})
    UserApi.followUser(id,data)
}

export const unFollowUser=(id,data)=>async(dispatch)=>{
    dispatch({type:'UNFOLLOW_USER'})
    UserApi.unFollowUser(id,data)
}