import React from "react";
import SideBar from "./sideBar";
import {connect} from "react-redux"
import DashboardSidebar from "./components/sidebar-container";
import UserBoard from "./components/user-boards";
import "./dashboard.css"
import jwt from "jsonwebtoken"
import TemplateCollection from './components/template-collection';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PrivateRoute from "../Components/PrivateRoute";
import MDContent from "./MDContent";
import TemplateBoards from "./components/template-boards"

class Dashboard extends React.Component {
	constructor(props) {
		super()
	}
	render() {
		const tokenUrl = localStorage.getItem("tokenUrl")
		const {user} = this.props;
		const {open} = this.props;
		  const templateListItems = ['Business', 'Design', 'Education', 'Engineering', 'Marketing', 'HR & Operations',
                             'Personal', 'Productivity', 'Product Management', 'Project Management', 'Sales',
                             'Support', 'Team Management'];
		return(
			<div>
				
				<SideBar open={open} />
				<div className="dashboard-container">
			      <div className="dashboard-sidebar">
			        <DashboardSidebar />
			      </div>
			      <div className="all-board">
			      
			      <Switch>
			        <Route exact path={`/${tokenUrl}/dashboard`}><UserBoard /></Route>
			        <Route exact path={`/${tokenUrl}/templates`} component={TemplateBoards} />

		            {templateListItems.map((templateListItem, index) =>
		              <Route 
		              	exact path = {`/${tokenUrl}/${templateListItem}`}
		                // path={'/templates/' + templateListItem} 
		                render={(props) => <TemplateCollection {...props} templateType={templateListItem} />}
		                key={index} />
		            )}
		            {templateListItems.map((item, index)=>
		            	<Route 
		               	exact path={`/${item}/:id`} 
		               	key={index} 
		               	render={() => <MDContent numkey={index}/>} />
	            	)}

		           </Switch>
		           
			      </div>
			    </div>
			    
			</div>
			)
	}
}
export default Dashboard;
// const mapStateToProps = state =>({
// 	dash: state.dash,
// })
// export default connect(mapStateToProps, null)(Dashboard);
