import React, {lazy, Suspense} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./LandingPage";
import SignUp from "./Container/SignUp/SignUp";
import LogIn from "./Container/SignIn/SignIn";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from "./Dashboard";
import PrivateRoute from "./Components/PrivateRoute";
import TestPage from "./Dashboard/TestPage";
import MainBoard from "./MainBoard";
import Confirm from "./Container/SignUp/EmailConfirm";
//import {connect} from "react-redux";

// const UserBoard = lazy(() => import('./components/user-boards'))
// const TemplateBoards = lazy(() => import('./components/template-boards'))
class App extends React.Component {
  constructor(props) {
    super(props)
  }
  

  // componentWillMount() {
  //   if (this.props.location.search !==undefined) {
  //     const query = queryString.parse(this.props.location.search);
  //     if (query.token) {
  //       window.localStorage.setItem("jwtToken", query.token);
  //       setAuthToken(query.token);
  //       const decoded = jwt_decode(query.token);
  //       const tokenUrl = jwt.sign(decoded.username, "secret")
  //       localStorage.setItem("tokenUrl", tokenUrl);
  //       store.dispatch(setCurrentUser(decoded))
  //       // this.props.history.push("/");
  //     }
  //   }
    
  // }
  componentDidMount() {

  }
  render() {

    return (
      <Router>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path = "/register/confirm/:id" component={Confirm} />
        <Route exact path="/login" component={LogIn} />
        <Switch>
          <PrivateRoute exact path="/:username/:board" component={Dashboard} />
          <PrivateRoute exact path="/main" component={MainBoard} />
        </Switch>
      </Router>
      )
  }
}
// const mapDispatchStateToProps = dispatch=>{
//   setCurrentUser: (a)=>dispatch(setCurrentUser(a))
// }
// export default connect(null, mapDispatchStateToProps)(App);

export default App;