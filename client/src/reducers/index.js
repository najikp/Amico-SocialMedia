import { combineReducers } from "redux";

import authReducer from "./authReducer";
import postReducer from "./postReducer";
import adminAuthReducer from "./adminAuthReducer";

export const reducers = combineReducers({ authReducer, postReducer, adminAuthReducer });
