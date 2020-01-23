import React from "react";
import AddContent from "./addcontent";
import ListContent from "./listcontent";
import {connect} from "react-redux"

function Content(props) {
	const {ntitle, contents} = props
	const newcnt = contents.filter(cnt=>cnt.title==ntitle)
	const parentrerender = () => {
		this.forceUpdate();
	}
	return (
		<div className="list_div">
			<textarea className="list_title_div" value={ntitle}/>
			<div>	
				{
					// newcnt.map(cnt=>{
					// 	console.log("cnt contents=========>")
					// 	console.log(cnt.contetns)
					// 	return(<h1>testetst</h1>)
					// })
					newcnt.map(cnt=>{
						console.log("cnt contents")
						console.log(cnt.contents)
						
						cnt.contents.map((content, index)=> {
						
							return(
								<h1>{content}</h1>
								 // <ListContent title={content} key={index}/>
								)
					
						})
						
					})
				}	
			</div>	
			<AddContent title={ntitle} parentrerender = {parentrerender}/>
		</div>
		)
}

const mapStateToProps = (state, ownProps)=> ({
	contents: state.dashs.boardContents,
	ntitle: ownProps.title
})
export default connect(mapStateToProps, null)(Content)