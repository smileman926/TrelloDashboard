const DISPLAY_SIDE = "DISPLAY_SIDE"

const initState = {
	boards: []
	}

export default function sideReducer(state=initState, action) {
	switch (action.type) {
		case "DISPLAY_SIDE":
			return {
				...state,
				boards: action.payload
			}						
		default:
			return state
	}
}