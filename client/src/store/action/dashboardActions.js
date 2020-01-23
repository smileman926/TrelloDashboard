import * as actionTypes from "./actionTypes";


export const toggleSidebar = () => {
	return {
		type: actionTypes.TOGGLE_SIDEBAR
	}
}
export const addRecent = (txt) => {
	return {
		type: actionTypes.ADD_RECENT,
		payload: txt
	}
}
export const addStar = (txt,isLike) =>dispatch=>{
	console.log(isLike)
	if (isLike) {

		return (

			dispatch({
				type: actionTypes.REMOVE_STAR,
				payload: txt
			}),
			dispatch({
				type: actionTypes.ADD_RECENT,
				payload: txt
			})
		)		
	}
	else {
		return (
		dispatch({
			type: actionTypes.ADD_STAR,
			payload: txt
		}),
		dispatch({
			type: actionTypes.REMOVE_RECENT,
			payload: txt
		})
		
		)
	}
	
}
export const removeRecent = (txt)=>{
	return {
		type: actionTypes.REMOVE_RECENT,
		payload: txt
	}
}
