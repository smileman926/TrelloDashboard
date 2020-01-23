import React, {useState} from "react"
import styled from "styled-components";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import {connect} from "react-redux";
import {addInfo} from "../../store/action/actions";
import "./board-card.css";
import {Link} from "react-router-dom";

const Card = styled.div`
    position: relative;
    border-radius: 4px;
    height: 90px;
    text-align: center;
    overflow: hidden;
    &:hover {
        opacity: .8;
    }
    &:hover .user-board-star {
        right: 0;
    }
`

const CardTitle = styled.div`
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: 700;
    color: white;
`
const IconStar = styled.div`
    display: contents;
    position: absolute;
    right: -35px;
    bottom: 5px;
    font-size: 16px;
    transition: right .3s;
    &:hover {
        right: 0;
    }
`
const POST_MUTATION = gql`
  mutation PostMutation($_id: String!, $isStarred: Boolean!) {
    addStar(id: $_id, star: $isStarred) {
      _id
      isStarred
    }
  }
`

function BoardCard(props) {
    //console.log(props)
    // const info = {
    //     id: _id,
    //     title: title,
    //     backgroundImageUrl: backgroundImageUrl,
    //     isStarred: isStarred
    // }
    const {_id, backgroundImageUrl, isStarred, title} = props.info
    const handleStar = e=> {
        e.preventDefault();
    }

    const handleCard = ()=> {
        
        props.addInfo(props.info)
        

    }
    
    return (

        <Link to="/main">
        <Card style={{backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover'}} onClick={handleCard}>
            <CardTitle>{title}</CardTitle>
            <Mutation mutation={POST_MUTATION} variables={{_id, isStarred}}>
              {postMutation => isStarred 
                ? <span className="user-board-star-check" onClick={postMutation} ><StarBorderIcon style={{ color: 'yellow' }} onClick={handleStar}/></span> 
                : <span className="user-board-star" onClick={postMutation} ><StarBorderIcon onClick={handleStar}/></span>}
            </Mutation>
            
        </Card>
        </Link>
       
    )

}

const mapStateToProps = (state, ownProps) => {
    const info = {
        _id: ownProps._id,
        title: ownProps.title,
        backgroundImageUrl: ownProps.backgroundImageUrl,
        isStarred: ownProps.isStarred
    }
    return {
        auth: state.auth,
        info: info
    }   
}
 const mapDispatchToProps = dispatch=> {
    return {
        addInfo: (a)=>dispatch(addInfo(a))
       
    }
 }
 export default connect(mapStateToProps, mapDispatchToProps)(BoardCard);