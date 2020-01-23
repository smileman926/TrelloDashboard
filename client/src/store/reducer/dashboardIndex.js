import * as actionTypes from "../action/actionTypes";

const initState = {
	toggleSidebar: false,
	board: {},
	boardContents: []
	}

 

export default function dashReducer(state=initState, action) {
	switch (action.type) {
		case actionTypes.TOGGLE_SIDEBAR:			
			return {
				...state,
				toggleSidebar: !state.toggleSidebar
			}
		case actionTypes.ADD_INFO:
		
			return {
				...state,			
				board: action.payload
			}
		case actionTypes.ADD_LIST:
			return {
				...state,
				boardContents: [...state.boardContents, action.payload]
			}
		case actionTypes.ADD_CONTENT:
			const {boardContents} = state
			for (var i in boardContents) {
			     if (boardContents[i].title == action.title) {
			        boardContents[i].contents.push(action.content);
			        break; //Stop this loop, we found it!
			     }
			   }
			return {
				...state,

			}
		// case actionTypes.ADD_RECENT:
		// 	if (state.recent.indexOf(action.payload)==-1) {
		// 		return {
		// 		...state,
		// 		recent: [...state.recent, action.payload]
		// 		}
		// 	}
		// 	else { return state }
		// case actionTypes.REMOVE_RECENT:
		// 	if (state.recent.indexOf(action.payload)!==-1) {
		// 		const new_recent = state.recent.filter(item=>item!=action.payload)
		// 		return {
		// 		...state,
		// 		recent: [...new_recent]
		// 		}
		// 	}
			
		// case actionTypes.ADD_STAR:
		// 	if (state.starred.indexOf(action.payload)==-1) {
		// 		return {
		// 		...state,
		// 		starred: [...state.starred, action.payload]
		// 		}
		// 	}
		// case actionTypes.REMOVE_STAR:
		// 	if (state.starred.indexOf(action.payload)!==-1) {
		// 		const new_recent = state.starred.filter(item=>item!=action.payload)
		// 		console.log('new_recent')
		// 		console.log(new_recent)
		// 		return {
		// 		...state,
		// 		recent: [...new_recent]
		// 		}
		// 	}
							
		default:
			return state
	}
}