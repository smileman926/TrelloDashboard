import React from 'react';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import "./boardBar.css"
import {MDBIcon} from "mdbreact"


function BoardBar({title, isStarred, username}) {
		const [star, setStar] = React.useState(isStarred);
		const userFirstLetter = username.slice(0,1)
		const handleStar = () => {
			setStar(!star)
		}
		console.log(star)
		return (
			<div className='boardbar_div'>
				<div className='left'>
					<button className="nav_btn" style={{fontWeight:"bolder",marginRight:"15px"}}>{title}</button>
					<button className='nav_btn'>
						{
							star
							? <StarBorderIcon style={{ color: 'yellow' }} onClick={handleStar}/>
							:<StarBorderIcon onClick={handleStar}/>
						}
					</button>
					<span>|</span>
					<button  className='nav_btn'>
						<strong>Psersonal</strong>
					</button>
					<span>|</span>
					<button  className='nav_btn'>
						<strong><MDBIcon icon="lock" /> Private</strong>
					</button>
					<span>|</span>
					<button  className='nav_btn circle'>
						<strong>{userFirstLetter}</strong>
					</button>

					<button  className='nav_btn'>
						<strong>Invite</strong>
					</button>
				</div>
				
				<div className='right'>
					<button  className='nav_btn'>
						<strong>
							<MDBIcon icon="toolbox" /> Butler
						</strong>
					</button>
					<button  className='nav_btn'>
						<strong>
							<MDBIcon icon="ellipsis-h" /> Show Menu
						</strong>
					</button>
				</div>
			</div>
			
		)
	
}


export default BoardBar;