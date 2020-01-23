import React, {useState} from "react";
import Drawer from "@material-ui/core/Drawer";
// import List from "@material-ui/core/List";
// import IconButton from "@material-ui/core/IconButton";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import "./sideBar.css"
import styled from "styled-components";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ScheduleIcon from "@material-ui/icons/Schedule";
import BarChartIcon from "@material-ui/icons/BarChart";
import ClearIcon from "@material-ui/icons/Clear";
import StarIcon from "@material-ui/icons/Star";









export default class sideBar extends React.Component {
	constructor(props) {
		super(props)
		
	}
	render() {
  	return (
  		
  		<Drawer
        className="sideBar"
        variant="persistent"
        anchor="left"
        open={this.props.open}
        
      >
        <div className="form-group" style={{padding: "3px"}}>
          <input type="text" className="form-control" placeholder="Find boards by name..."/>
        </div>
        <div id="star-board">
          <div className="item-desc">
            <span><StarBorderIcon /></span>
            <span>STARRED BOARDS</span>
            <span className="optional-btn"><button className="btn btn-default" data-toggle="collapse" data-target="#star"><AddIcon /></button></span>
          </div>
          <div className="item-content collapse" id="star">
            <p>Star your most important boards to keep them right at your fingertips.</p>
          </div>
        </div>
        <div id="recent-board">
          <div className="item-desc">
            <span><ScheduleIcon /></span>
            <span>RECENT BOARDS</span>
            <span className="optional-btn"><button className="btn btn-default" data-toggle="collapse" data-target="#recent"><AddIcon /></button></span>
          </div>
          <div className="item-content collapse" id="recent">
            <a href="#">
              <div className="mini-board">
                <div className="square"></div>
                <div className="back-board">Welcome to Trello
                  <p className="icon-group"> 
                    <span><ClearIcon /></span>
                    <span><StarBorderIcon /></span>
                  </p>
                </div>
               
              </div>
            </a>
          </div>
        </div>
        <div id="personal-board">
          <div className="item-desc">
            <span><BarChartIcon /></span>
            <span>PERSONAL BOARDS</span>
            <span className="optional-btn"><button className="btn btn-default" data-toggle="collapse" data-target="#personal"><AddIcon /></button></span>
          </div>
          <div className="item-contentn collapse" id="personal">
            <a href="#">
              <div className="mini-board">
                <div className="square"></div>
                <div className="back-board">Welcome to Trello
                  <p className="icon-group"> 
                    <span><ClearIcon /></span>
                    <span><StarBorderIcon /></span>
                  </p>
                </div>

              </div>
            </a>
          </div>
        </div>
        <div id="link-board">
        <p><a href="#" className="link-url">Create new board...</a></p>
        <p><a href="#" className="link-url">Always keep this menu open.</a></p>
        <p><a href="#" className="link-url">See closed boards...</a></p>
        </div>
      </Drawer>
      
  		)
  }
}

	