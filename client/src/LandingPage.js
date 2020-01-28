import React from "react";

import LoadingBar from "./Components/WithSpinner/with-spinner";
import Navbar from "./Components/Navbar/Navbar";
import Collaborative from "./Container/Collaborative/Collaborative";
//import WorkWithTeam from "./Container/WorkWithTeam/WorkWithTeam";
import WorkWithTeam1 from "./Container/WorkWithTeam/WorkWithTeam1";
import Information from "./Container/Information/Information";
// import WorkFlow from "./Container/Workflow/WorkFlow";
import TrelloWays from "./Container/TrelloWays/TrelloWays";
import WorkSmarter from "./Container/WorkSmarter/WorkSmarter";
import PlaningToday from "./Container/PlaningToday/PlaningToday";
import Footer from "./Container/Footer/Footer";
import SeeCarousel from "./Container/SeeCarousel/SeeCarousel";
import "./App.css";
import {connect} from "react-redux";
import {getPageData} from "./store/action/actions";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {setCurrentUser} from "./store/action/actions";
import store from "./store"
import jwt from "jsonwebtoken"
import queryString from "query-string";


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      opacity: 0
    }
  }

  componentWillMount() {
    console.log(this.props.location.search)
    const token = localStorage.getItem("jwtToken")
    console.log(token)
      if (this.props.location.search !==undefined && !token) {
        const query = queryString.parse(this.props.location.search);
        if (query.token) {
          window.localStorage.setItem("jwtToken", query.token);
          setAuthToken(query.token);
          let payload = query.token;
          const decoded = jwt_decode(payload);

          const info = decoded._doc
          console.log(info)
          payload = info.username
          const tokenUrl = jwt.sign(payload, "secret")
          localStorage.setItem("tokenUrl", tokenUrl);
          store.dispatch(setCurrentUser(info))
          this.props.history.push(`${tokenUrl}/dashboard`);
        }
      }
    } 

  componentDidMount() {

    this.props.getPageDatas();
    document.addEventListener("scroll", ()=>{
      const h = window.scrollY;
      if (h>80) {
        this.setState({
          opacity:1
        })
      }
        else{
          this.setState({
            opacity: 0
          })
        }
    });
  }
  render() {
    console.log(process.env)
    const { loading, pageDatas } = this.props;
    
    if (loading) {

      return <LoadingBar />
    }
    return (
      <div className="App">
        <Navbar opacity={this.state.opacity}/>
        <div className="app-content">
        <Collaborative data={pageDatas.Collaborative} id="Collaborative" />
        
        <WorkWithTeam1 id="WorkWithTeam" />
        <Information data={pageDatas.Information} id="Information" />
        <SeeCarousel />
        <TrelloWays data={pageDatas.TrelloWays} id="TrelloWays" />
        <WorkSmarter />
        <PlaningToday data={pageDatas.PlaningToday} id="PlaningToday" />
        <Footer data={pageDatas.FooterLists} id="Footer" />
        </div>
      </div>
      )
  }
}

const mapStateToProps = state => {
  return {
    pageDatas: state.Datas.pageDatas,
    loading: state.Datas.loading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getPageDatas: ()=> dispatch(getPageData())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
