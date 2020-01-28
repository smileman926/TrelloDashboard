import * as actionTypes from "./actionTypes";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import jwt from "jsonwebtoken";
import { SERVER_PORT } from "../../config"


export const getPageData = () => {
	return  dispatch => {
		 fetch("pageData.json")
			.then(async response=>{
				 response.ok
		          ? dispatch({type: actionTypes.getPageDatas, pagedatas: await response.json()})
		          : Promise.reject(`Can"t communicate with REST API server (${response.statusText})`)		
			})
			.catch(err=>{
				console.log(err);
			});
	}
}
export const registerUser = (userData, history) => {
	
	return  dispatch => {

	axios
		.post(`${SERVER_PORT}/api/users/register`, userData)
		// .then(()=>console.log("ok"))
		// .then(res=> history.push("/login"))
		.then(res=> 
			dispatch({
				type: actionTypes.GET_MSG,
				payload: res.data.msg
			})
			)
		.catch(err=>
			dispatch({
				type:actionTypes.GET_ERRORS,
				payload: err.response.data
			})
			
			)
			//console.log(err.response.data))
		//
	}
}
export const googleUser = ()=> {
	const config = {
		headers: {
			'Access-Control-Allow-Origin': "http://localhost:3000"
		}
	}
	return dispatch=>{
		fetch(`${SERVER_PORT}/auth/google/sign`, {
			headers: { "Content-Type": "application/json; charset=utf-8" },
  			method: 'GET'
		})
		.then(res=>console.log("okkk===>"))
		// axios.get(`${SERVER_PORT}/auth/google/sign`);
	}
	
}
export const loginUser = (userData) => {
	console.log(SERVER_PORT)
	return dispatch => {
	axios
		.post(`${SERVER_PORT}/api/users/login`, userData)
		.then(res=>{
			const {token} = res.data;
			localStorage.setItem("jwtToken", token);
			setAuthToken(token);

			const decoded = jwt_decode(token);
			
    		const tokenUrl = jwt.sign(decoded.username, "secret")
			localStorage.setItem("tokenUrl", tokenUrl);
			
			dispatch(setCurrentUser(decoded));
		})
		.catch(err=>
			dispatch({
				type:actionTypes.GET_ERRORS,
				payload: err.response.data
			})
			);	
	}
}
export const setCurrentUser = decoded=> {
	return {
		type: actionTypes.SET_CURRENT_USER,
		payload: decoded
	}
}
export const logoutUser = () =>dispatch=> {
	localStorage.removeItem("jwtToken");
	setAuthToken(false);
	dispatch(setCurrentUser({}));
}
export const addInfo = info=> {
	
	return {
		type: actionTypes.ADD_INFO,
		payload: info
	}
}
export const addList = title=> {
	const newobj = {
		title: title,
		contents: []
	}
	return {
		type: actionTypes.ADD_LIST,
		payload: newobj
	}
}
export const addContent = (content, title)=> {
	return {
		type: actionTypes.ADD_CONTENT,
		title: title,
		content: content 
	}
}

