import React from "react";
import {connect} from "react-redux";
import {logoutUser} from "../store/action/actions";
import Navigation from "./Navigation";
import Dashboard from "./Dashboard";
import { Switch, Link, Route } from "react-router-dom";
// import TestPage from "./TestPage";

class Main extends React.Component {
	handleClick = e=>{
		e.preventDefault();
		this.props.logoutUser();
	}

	render() {
		
			const {user} = this.props.auth;
			const userFirstLetter = user.username.slice(0,1)
			const open_flag = this.props.dash.toggleSidebar;
		return(
			<div>
				<Navigation userFirstLetter={userFirstLetter}/>
				<Switch>
				<Route path="/"><Dashboard user={user} open={open_flag}/></Route>
				
				</Switch>
				<p>Hello <strong>{user.username}!</strong> Welcome to Dashboard.</p>
				<input type="button" className="btn btn-primary" value="Log Out" onClick={this.handleClick}/>
			</div>
			)
	}
}


const mapStateToProps = state=> ({
	auth: state.auth,
	dash: state.dashs,

})
const mapDispatchToProps = dispatch=>({
	logoutUser: ()=>dispatch(logoutUser())
})
export default connect(mapStateToProps, mapDispatchToProps)(Main);