import React, {Component} from "react";
import {render} from "react-dom";
import { connect } from "react-redux";
import arrayMove from "array-move";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import AddContent from "./addcontent";
import ListContent from "./listContent";

import changecollection from "../action/changecollection";
import dragdrop from "../action/dragdrop";




const mapStateToProps = state => ({
	boardId: state.userboard.boardId,
	boardTitle: state.userboard.boardTitle,
	boardImgurl: state.userboard.boardImgurl,
	boardColor: state.userboard.boardColor,
	boardContents: state.userboard.boardContents
});

const mapDispatchProps = dispatch => ({
	// changeListTitle: (title) => dispatch(changeListTitle(title, id)),
	changecollection: (collection,id) => dispatch(changecollection(collection,id)),
	dragdrop: (destination,source,draggableId) => dispatch(dragdrop(destination,source,draggableId))

})


class List extends Component {
	constructor(props){
		super(props);
		this.parentrerender = this.parentrerender.bind(this);
		this.changeListTitle = this.changeListTitle.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	async onDragEnd(result){
		console.log(result)
		console.log(this.props.boardContents)
		if (result.destination == null) {
			return;
		}

		await this.props.dragdrop(result.destination,result.source,result.draggableId);
		var collection = {
				contents: this.props.boardContents 
			};
		this.props.changecollection(collection,this.props.boardId);
	}

	changeListTitle(e) {
		if (e.target.value !="") {

		} 
	}

	parentrerender() {
		this.forceUpdate();
	}

	render() {

		console.log(this.props.boardContents);
		return (
			 <DragDropContext
        onDragEnd={this.onDragEnd}
      >

				<div className="list_container_div">
					{
						Object.keys(this.props.boardContents).map((key,index) => {
							
							if (key != "default") {
								return (
									
									<div className="list_div" key={`${key}${index}`}>
										<div>
											<textarea className="list_title_div" onChange={this.changeListTitle} defaultValue={key}/>
										</div>
											<Droppable droppableId={key} type="Task" key={`droppable${key}${index}`}>

        								{(provided, snapshot) => 
        									<div ref={provided.innerRef}
								              {...provided.droppableProps}
								              className="onelist_div"
								              >
														{
															this.props.boardContents[key].map((content,index) => {
																if (content != "") {
																	return (
																		<Draggable
															        draggableId={content}
															        index={index}
															        key={`draggable${content}${index}`}
															      >
																		{
										                	(provided, snapshot) => (
										                		<div 
											                		{...provided.draggableProps}
															            {...provided.dragHandleProps}
															            ref={provided.innerRef}
															            key={`${content}${index}`}
														            >
																					<ListContent title={content} />
																				</div>
										                		)
										                }
																		
																		</Draggable>
																	);
																} 
															})
														}
														{provided.placeholder}
													</div>
												}

        							</Droppable>
										<AddContent key={this.props.boardId} title={key} parentrerender = {this.parentrerender}/>
									</div>
										
								);
							}
						 
						})
					}
				</div>

			</DragDropContext>
		);

	}
}


export default connect(mapStateToProps,mapDispatchProps)(List);