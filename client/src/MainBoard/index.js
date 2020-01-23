import React from "react";
import {connect} from "react-redux";
// import {logoutUser} from "../store/action/actions";
import Navigation from "../Dashboard/Navigation";
// import Dashboard from "./Dashboard";
import { Switch, Link, Route } from "react-router-dom";
// import TestPage from "./TestPage";
import MainBoard from "./MainBoard";

function Main(props) {

	
		
			const {user} = props.auth;
			const userFirstLetter = user.username.slice(0,1)
			const open_flag = props.dash.toggleSidebar;
		return(
			<div>
				<Navigation userFirstLetter={userFirstLetter}/>
				<MainBoard open={open_flag}/>
				
			</div>
			)
	
}


const mapStateToProps = state=> ({
	auth: state.auth,
	dash: state.dashs
})
// const mapDispatchToProps = dispatch=>({
// 	logoutUser: ()=>dispatch(logoutUser())
// })
 export default connect(mapStateToProps, null)(Main);