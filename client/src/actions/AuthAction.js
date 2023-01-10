import { toast } from "react-hot-toast";
import * as AuthApi from "../api/AuthRequest.js";
export const logIn = (FormData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(FormData);
    dispatch({ type: "AUTH_SUCCESS", data: data});

  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL", message:error.message });
    toast.error(error.response.data)
  }
};

export const signUp = (FormData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(FormData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const logout=()=>async(dispatch)=>{
  dispatch({type:'LOGOUT'})
}


export const adminLogin = (FormData) => async (dispatch) => {
  dispatch({ type: "ADMIN_AUTH_START" });
  try {
    const { data } = await AuthApi.adminLogin(FormData);
    dispatch({ type: "ADMIN_AUTH_SUCCESS", data: data});

  } catch (error) {
    console.log(error);
    dispatch({ type: "ADMIN_AUTH_FAIL", message:error.message });
    toast.error(error.response.data)
  }
};

export const adminLogout=()=>async(dispatch)=>{
  dispatch({type:'ADMIN_LOGOUT'});
}