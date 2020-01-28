import React, {useReducer, useEffect} from "react"
import styled from "styled-components";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
//import {StarBorder} from "@material-ui/icons/StarBorder";
// import {addRecent, addStar} from "../../store/action/dashboardActions"
import BoardCard from "./board-card";
import CreateBoardCard from "./create-board-card";
import {connect} from "react-redux";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { MDBBtn, MDBModal, MDBModalFooter, MDBNavLink, MDBIcon } from 'mdbreact';
import "./Modal.css";
import Radio from '@material-ui/core/Radio';
import { Mutation } from 'react-apollo';
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import sideReducer from "../../store/reducer/sideReducer"
// import {addInfo} from "../../store/action/actions"
const initState = {
    boards: []
    }

const CardOverview = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;

    @media screen and (max-width: 900px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`;
const GET_PUREBOARDS = gql`
query {
    pureBoards {
        _id
        title
        backgroundImageUrl
        isStarred
    }
}
`;
const GET_RECENTBOARDS = gql`
query {
    recentBoards {
        _id
        title
        backgroundImageUrl
        isStarred
    }
}
`;
const POST_MUTATION = gql`
  mutation PostMutation($modalTitle: String!, $selectedValue: String!) {
    addBoard(title: $modalTitle, backgroundImageUrl: $selectedValue) {
      _id
      
    }
  }
`
// const GET_STARREDBOARDS = gql`
// query {
//     pureBoards {
//         title
//         backgroundImageUrl
//         isStarred
//     }
// }
// `;
const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function UserBoard(props) {
    const DISPLAY_SIDE = "DISPLAY_SIDE"
        const classes = useStyles();
        // const {starred, recent, personal } = props.dashs
        const [open, setOpen] = React.useState(false);

        const handleOpen = () => {
            setOpen(true);
        };

        const handleToggle = () => {
            setOpen(!open);
        };
        const visible = true;
        
        // const [sidestarBoards, setSidestarBoards] = React.useState();
        const [sideBoards, setSideBoards] = React.useState();
        // const [siderecBoards, setSiderecBoards] = React.useState();
        const [state, dispatch] = useReducer(sideReducer, initState);
        console.log("sideddd")
        console.log(sideBoards)
        // useEffect(() => {
        //     dispatch({type: DISPLAY_SIDE, payload: sideBoards})
        // });
        // useEffect(
        //     () => {
        //         return () => {
        //         console.log("sideBoards");
        //         console.log(sideBoards);
        //             // debugger
        //             dispatch({type: DISPLAY_SIDE, payload: sideBoards})
        //             // debugger
        //             console.log("baz");
        //           }
        //         }
        //       );

        const [selectedValue, setSelectedValue] = React.useState("https://raw.githubusercontent.com/Anthony-genius/WebDreamTrelloAssets/master/trello-theme-img/theme1.jpg");
        const [modalTitle, setModalTitle] = React.useState('')
        const [btnClass, setBtnClass] = React.useState(true)
        const handleChange = event => {
            setSelectedValue(event.target.value);
        };
        const handleModalChange = event => {
            setModalTitle(event.target.value)
            setBtnClass(false)
        }
        const tokenUrl = localStorage.getItem("tokenUrl")

        const themeUrls = [];
        for (var i = 1; i < 10; i++) {
            themeUrls.push(`https://raw.githubusercontent.com/Anthony-genius/WebDreamTrelloAssets/master/trello-theme-img/theme${i}.jpg`)
        }
    return (
        <div>
            <div>

                <div>
                    <AccessTimeIcon />
                    <span>Starred Viewed</span>
                </div>
                
                    <Query 
                        pollInterval={500} 
                        query={GET_PUREBOARDS} 
                        >
                        {({ loading, error, data }) => {
                           
                            if (loading) return <CircularProgress />;
                            else if (error) return `Error! ${error.message}`;
                            else if(data.pureBoards.length==0) {
                                return(<h3>No Data</h3>)
                            }
                            
                            // console.log("sideboards==>")
                            // console.log(sideBoards)
                                return (
                                    <CardOverview>
                                    {data.pureBoards.filter(board=>board.isStarred==true).map((board, index) => (
                                        <BoardCard key={index} {...board} />
                                    ))}
                                    </CardOverview>
                                )
                            
                            
                        }}
                    </Query>
                    
                
            </div>
            <div>
                <div>
                    <AccessTimeIcon />
                    <span>Recently Viewed</span>
                </div>
                
                    <Query 
                        pollInterval={500} 
                        query={GET_RECENTBOARDS} 
                        >
                        {({ loading, error, data }) => {
                           
                            if (loading) return <CircularProgress />;
                            else if (error) return `Error! ${error.message}`;
                            else if(data.recentBoards.length==0) {
                                return(<h3>No Data</h3>)
                            }
                            // setSiderecBoards(data)
                            // console.log("recsideboards==>")
                            // console.log(siderecBoards)
                                return (
                                    <CardOverview>
                                    {data.recentBoards.map((board, index) => (
                                        <BoardCard key={index} {...board} />
                                    ))}
                                    </CardOverview>
                                )
                            
                            
                        }}
                    </Query>
                
            </div>
            <div>
                <div>
                    <AccessTimeIcon />
                    <span>Personal Boards</span>
                </div>
                
                    <Query 
                        pollInterval={500} 
                        query={GET_PUREBOARDS} 
                        >
                        {({ loading, error, data }) => {
                           
                            if (loading) return <CircularProgress />;
                            else if (error) return `Error! ${error.message}`;
                            else if(data.pureBoards.length==0) {
                                return(<h3>No Data</h3>)
                            }
                            setSideBoards(data)
                                return (
                                    <div>
                                    <CardOverview>
                                    {data.pureBoards.map((board, index) => (
                                        <BoardCard key={index} {...board} />
                                    ))}
                                    <span onClick={handleOpen}><CreateBoardCard title="Create a new" /></span>
                                    
                                    </CardOverview>
                                    <MDBModal className="modal-opacity" isOpen={open} toggle={handleToggle}>
                                        <div className="create-board-modal-header">
                                            <div className="create-board-title" style={{backgroundImage: `url(${selectedValue})`}}>
                                                <button onClick={handleToggle} className="close-btn">
                                                    <MDBIcon icon="times" />
                                                </button>
                                                <input
                                                
                                                //onChange={}
                                                type="text"
                                                placeholder="Add board title"
                                                onChange={handleModalChange}
                                                />
                                                <div>
                                                    <button className="select-btn">
                                                        <span>No team</span>
                                                        <MDBIcon className="icon-sm" icon="angle-down" />
                                                    </button>
                                                    <button className="select-btn">
                                                        <MDBIcon className="icon-sm" icon="lock" />
                                                        <span>Private</span>
                                                        <MDBIcon className="icon-sm" icon="angle-down" />
                                                    </button>
                                                </div>
                                            </div>  
                                            <div className="theme-area">
                                                {themeUrls.map((theme, index) => (
                                                    
                                                    <Radio
                                                    className="background-grid-item"
                                                    checked={selectedValue === theme}
                                                    onChange={handleChange}
                                                    value={theme}
                                                    name={`radio-button-demo${index}`}
                                                    key={index}
                                                    style={{backgroundImage: `url(${theme})`, borderRadius: 0, backgroundSize: 'cover'}}
                                                    />
                                                ))}
                                                    
                                            </div>
                                        </div>
                                        <MDBModalFooter className="board-modal-footer">
                                            <Mutation mutation={POST_MUTATION} variables={{modalTitle, selectedValue}}>
                                              {postMutation => <button className="btn btn-primary create-btn" onClick={postMutation} disabled={btnClass}>Create Board</button>}
                                            </Mutation>
                                            
                                                
                                            <MDBNavLink to={`/${tokenUrl}/templates`} className="start-with-a-template">
                                                <MDBIcon className="md-icon" fab icon="trello" />
                                                <span>Start-with-a-Template</span>
                                            </MDBNavLink>
                                        </MDBModalFooter>
                                    </MDBModal>
                                    </div>
                                )
                            
                            
                        }}
                    </Query>

                    
                
            </div>
        </div>
    )
    
}
 export default UserBoard;
// const mapStateToProps = state => {
//     return {
//         dashs: state.dashs
//     }   
// }
//  const mapDispatchToProps = dispatch=> {
//     return {
//         addRecent: (a)=>dispatch(addRecent(a)),
//         addStar: (a,b)=>dispatch(addStar(a,b))
//     }
//  }
 //export default connect(mapStateToProps, mapDispatchToProps)(UserBoard);