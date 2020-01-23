import React, {Component} from 'react';
import {render} from 'react-dom';
import { MDBIcon } from "mdbreact";
import { connect } from "react-redux";

import {addContent} from "../../store/action/actions";
//import changecollection from "../action/changecollection";

// const mapStateToProps = state => ({
// 	// boardId: state.userboard.boardId,
// 	// boardTitle: state.userboard.boardTitle,
// 	// boardImgurl: state.userboard.boardImgurl,
// 	// boardColor: state.userboard.boardColor,
// 	// boardContents: state.userboard.boardContents
// });

const mapDispatchProps = (dispatch) => ({
	addContent: (content,title) => dispatch(addContent(content,title)),
	//changecollection: (collection,id) => dispatch(changecollection(collection,id))

}); 

class AddContent extends Component {
	constructor(props){
		super(props);
		this.state = {
			show: false,
			content: ""
		}

		this.showInput = this.showInput.bind(this);
		this.closeInput = this.closeInput.bind(this);
		this.inputcontent = this.inputcontent.bind(this);
		//this.addcontentfunc = this.addcontentfunc.bind(this);
		this.keypress = this.keypress.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	// async addcontentfunc() {

	// 	if (this.state.content != "") {
			
	// 		await this.props.addcontent(this.state.content,this.props.title);
	// 		var collection = {
	// 			contents: this.props.boardContents 
	// 		};
			
	// 		this.props.changecollection(collection,this.props.boardId);
	// 	}
	// 	this.closeInput();
	// 	this.props.parentrerender();

	// }

	inputcontent(e) {

		this.setState({
			content: e.target.value
		});

	}
	handleClick(e) {
		e.preventDefault();
		this.props.addContent(this.state.content, this.props.title)
		this.setState({
				show: false,
				content: ""
			})
		 this.props.parentrerender()
	}
	keypress(e) {

		const key = e.which || e.keyCode;
        if (key === 13) { //enter key
            this.props.addContent(this.state.content, this.props.title);
        }

	}

	showInput() {
		if ( !this.state.show ) {
			this.setState({
				show: true
			})
		}
		
	}

	closeInput() {

		console.log(this.state.content);
		this.setState({
				show: false,
				content: ""
			})

	}
	
	render() {

		const addlist = <h6 className="board_addCardDiv--title">+ Add a card </h6>;

		const addcontent = 
			<div>
				<textarea className="board_addCardDiv--input" type="text" placeholder="Enter list tilte..." onChange={this.inputcontent} onKeyPress={this.keypress} autoFocus/>
				<button className="board_addCardDiv--button" onClick={this.handleClick}>Add Card</button>
				<button className="board_addCardDiv--button" style={{backgroundColor: "rgba(0,0,0,0)", color: "black"}} onClick={this.closeInput}>
					<MDBIcon icon="times"/>
				</button>
			</div>;

		return (
				<div onClick = { this.showInput } className="board_addCardDiv">
					{
						this.state.show === false ? addlist: addcontent
					}
				</div>
			);
	}
}


export default connect(null,mapDispatchProps)(AddContent);