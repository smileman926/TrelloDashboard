import React, {Component} from "react";
import {render} from "react-dom";
import { connect } from "react-redux";
import { MDBIcon } from "mdbreact";
// import arrayMove from "array-move";

import AddContent from "./addcontent";


export default class ListContent extends Component {
	constructor(props){
		super(props);
	}

	render() {
		console.log("========")
		
		return (

		 	<div className="list_content">
				<div className="list_content--title">
					{this.props.title}
				</div>
				<div className="list_content--pen">
					<MDBIcon icon="pen" />
				</div>
			</div>

		);
	}
}

// const mapStateToProps = (state,ownProps)=> ({
// 	notes: state.dashs.boardContents,
// 	title: ownProps.title
// })
