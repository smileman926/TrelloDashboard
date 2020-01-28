import {combineReducers} from "redux";
import authReducer from "./authReducer";
import pageDatasReducer from "./pageDatasReducer";
import errors from "./errorsReducer";
import dashReducer from "./dashboardIndex";
import sideReducer from "./sideReducer"

export default combineReducers({
	auth: authReducer,
	Datas: pageDatasReducer,
	errors: errors,
	dashs:  dashReducer,
	sides: sideReducer
})
