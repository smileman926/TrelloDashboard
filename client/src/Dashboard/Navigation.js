import React from "react";
//import NavSearch from "../component/navSearch";
import "./Navigation.css"
import {HomeOutlined, Search, Add, InfoOutlined, NotificationsNone} from "@material-ui/icons"
import sideBar from "./sideBar"
import {toggleSidebar} from "../store/action/dashboardActions"
import {connect} from "react-redux";
import BarChartIcon from "@material-ui/icons/BarChart";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import {Link} from "react-router-dom";




class NavBar extends React.Component{
	constructor(props){
		super(props);
		
	}
	
	render(){
		const mark = this.props.userFirstLetter
		const tokenUrl = localStorage.getItem("tokenUrl")
		return (
			<div>
			<nav className="navbar navbar-expand-sm navbar-dark fixed-top">
			  
			  <ul className="navbar-nav">
			    <li className="nav-item">
			      <button className="nav_btn"><Link to={`/${tokenUrl}/dashboard`}><HomeOutlined style={{color: "white"}}/></Link></button>
			    </li>
			    <li className="nav-item">
			      <button className="nav_btn" onClick={this.props.toggleSidebar}>boards</button>
			    </li>
			    <li className="nav-item input-group customSearch">
					<input type="search" className="navsearch"/>
					<div className="input-group-append" style={{marginLeft: "0px"}}>
					    <a className="btn btn-search" type="submit"><Search className="searchBtn" style={{color:"white"}} /></a>
					</div>			    	
			    </li>
			  </ul>
			  <img alt="Trello" className="trello-logo" src="/images/trello-logo.svg"/>
			  <ul className="navbar-nav right">
				  <li className="nav-item dropdown">
				  	<button className="nav_btn dropdown-toggle" data-toggle="dropdown"><Add /></button>
				  	<div class="dropdown-menu">
				      <h5 class="dropdown-header">
				      <span>Create</span>
				      <button type="button" class="close" data-dismiss="dropdown">&times;</button>
				      </h5>
				      <div className="dropdown-divider"></div>
				      <a class="dropdown-item" href="#">
				      	<p className="item-desc">
				            <span><BarChartIcon /></span>
				            <span>Create Board...</span>
			         	</p>
				        <p className="item-content">
				          A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.
				        </p>
				      </a>
				      <a class="dropdown-item" href="#">
				      	<p className="item-desc">
				            <span><PeopleOutlineIcon /></span>
				            <span>Create Team...</span>
			         	</p>
				        <p className="item-content">
				          A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.
				        </p>
				      </a>
				      <a class="dropdown-item" href="#">
				      	<p className="item-desc">
				            <span><LocalMallIcon /></span>
				            <span>Create Business Team...</span>
			         	</p>
				        <p className="item-content">
				          A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.
				        </p>
				      </a>
				    </div>
				  </li>
				  <li className="nav-item dropdown">
				  	<button className="nav_btn dropdown-toggle" data-toggle="dropdown"><InfoOutlined /></button>
				  	<div class="dropdown-menu">
				      <h5 class="dropdown-header">
				      <span>Information</span>
				      <button type="button" class="close" data-dismiss="dropdown">&times;</button>
				      </h5>
				      <div className="dropdown-divider"></div>
				      <a class="dropdown-item" href="#">
				      	<img src="" alt="Dropdown-logo" />
				      	<p>DESRIPTION</p>
				      </a>
				      <a class="dropdown-item" href="#">Get a new tip</a>
				      <ul>

				      </ul>
				    </div>
				  </li>
				  <li className="nav-item dropdown">
				  	<button className="nav_btn dropdown-toggle" data-toggle="dropdown"><NotificationsNone /></button>
				  	<div class="dropdown-menu">
				      <h5 class="dropdown-header">
				      <span>Notifications</span>
				      <button type="button" class="close" data-dismiss="dropdown">&times;</button>
				      </h5>
				      <div className="dropdown-divider"></div>
				      <a class="dropdown-item" href="#">View all</a>
				      <img src="" alt="img" />
				      <a class="dropdown-item" href="#">Link 2</a>
				      <a class="dropdown-item" href="#">Link 3</a>
				    </div>
				  </li>
				  <li className="nav-item dropdown">
				  	<button className="nav_btn circle dropdown-toggle" data-toggle="dropdown">{mark}</button>
				  	<div class="dropdown-menu">
				      <h5 class="dropdown-header">
				      <span></span>
				      <button type="button" class="close" data-dismiss="dropdown">&times;</button>
				      </h5>
				      <div className="dropdown-divider"></div>
				      <a class="dropdown-item" href="#">Profile and Visibility</a>
				      <a class="dropdown-item" href="#">Activity</a>
				      <a class="dropdown-item" href="#">Cards</a>
				      <a class="dropdown-item" href="#">Settings</a>
				      <div className="dropdown-divider"></div>
				      <a class="dropdown-item" href="#">Help</a>
				      <a class="dropdown-item" href="#">Shortcuts</a>
				      <a class="dropdown-item" href="#">Change Language...</a>
				      <div className="dropdown-divider"></div>
				      <a class="dropdown-item" href="#">Logout</a>
				    </div>
				  </li>
			  </ul>
			</nav>
			</div>
				

			
		)
	}
}
const mapDispatchToProps = dispatch => {
	return {
		toggleSidebar: ()=> dispatch(toggleSidebar())
	}
}
export default connect(null, mapDispatchToProps)(NavBar);



