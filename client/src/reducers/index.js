import { combineReducers } from "redux";

import film from "./film";
import auth from "./auth";
import users from "./users";
import payment from "./payment";
import category from "./category";

export default combineReducers({ payment,film, auth, users,category});
