import React, {Component} from "react";
import {render} from "react-dom";
import { connect } from "react-redux";
import AddContent from "./addcontent";
import ListContent from "./listcontent";
// import arrayMove from "array-move";
// import {SortableContainer, SortableElement} from 'react-sortable-hoc';
// import Content from "./content";

import "./list.css"
// const mapStateToProps = state => ({
// 	boardId: state.userboard.boardId,
// 	boardTitle: state.userboard.boardTitle,
// 	boardImgurl: state.userboard.boardImgurl,
// 	boardColor: state.userboard.boardColor,
// 	boardContents: state.userboard.boardContents
// });

// // const mapDispatchProps = dispatch => ({
// 	changeListTitle: (title) => dispatch(changeListTitle(title, id))
// })


class List extends Component {
	constructor(props){
		super(props);

		this.parentrerender = this.parentrerender.bind(this);

		this.changeListTitle = this.changeListTitle.bind(this);
		// this.onSortEnd = this.onSortEnd.bind(this);
	}
	parentrerender() {
		this.forceUpdate();
	}
	changeListTitle(e) {
		if (e.target.value !="") {

		} 
	}

	render() {


		// const Content = ({title, contents}) => {
		// 	console.log('title')
		// 	console.log(title)
		// 	console.log("contents")
		// 	console.log(contents)
		// 	console.log(contents.length)
		// 		return (
		// 			<div className="list_div">
		// 				<textarea className="list_title_div" value={title}/>
		// 				{
							
		// 					contents.map((content, index)=> {
		// 						if (content != "") {
		// 							return(
		// 								 <ListContent title={content} key={index}/>
		// 								)
		// 						}
		// 					})

		// 				}
		// 				<AddContent title={title}/>
		// 			</div>
		// 		);
		// };

		const Content = ({title, contents}) => {
			console.log("title")
			console.log(title)
			console.log("contents")
			console.log(contents)
			return (
				<div className="list_div">
					<textarea className="list_title_div" value={title}/>
						{
							
							contents.map((content, index)=> {
								
								if (content != "") {
									return(
										 <ListContent title={content} key={index}/>
										)
								}
							})

						}
						<AddContent title={title} parentrerender = {this.parentrerender}/>
					</div>
				)
		}
		return (
			<div className="list_container_div">
				{
					this.props.contents.map((key,index) => {
						
							return (
								<Content title={key.title} contents={key.contents} key={index}/>
							);
					})
				}
			</div>
			);
	}
}

const mapStateToProps = state=> ({
	contents: state.dashs.boardContents
})
export default connect(mapStateToProps,null)(List);