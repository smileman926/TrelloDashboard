import React from 'react';
import styled from 'styled-components';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// import BoardCard from './board-card';
import TemplateCard from "./template-card";
import CircularProgress from "@material-ui/core/CircularProgress";
import templates from "./templates.json";
import templateImg from "./templateImg";
import Topbar from "./Topbar"
import HeaderBar from "./HeaderBar";

const TemplateCollectionOverview = styled.div`
	
	margin-top: 31px;
	max-width: 912px;

	display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
`

// const GET_BOOKS_BY_TEMPLATETYPE = gql`
// 	query boardsByType($boardTemplateType: String) {
// 		boardsByType(templateType: $boardTemplateType) {
//         	title
// 		    backgroundImageUrl
// 		    isTemplate
// 		    templateType
// 		    visitedTime
// 		    isStarred
// 		    author
// 		    symbolIconUrl
// 		    brief
// 		    linkUrl
//     	}
// 	}
// `;
// const GET_BOOKS = gql`
// 	query  {
// 		boards
// 		 {
// 		 	_id
//         	title
// 		    backgroundImageUrl
// 		    isTemplate
// 		    templateType
// 		    visitedTime
// 		    isStarred
// 		    author
// 		    symbolIconUrl
// 		    brief
// 		    linkUrl
//     	}
// 	}
// `;
export default function TemplateCollection({match, templateType}) {
	const templateBoards = templates[templateType]
	const filterArr = templateImg.filter(item => item.title == templateType)
	console.log(filterArr)
	const {title, templateImgPosition} = filterArr[0];

	return (
		<div>
			<Topbar  templateType={templateType}/>
			<HeaderBar title={title} imgPos={templateImgPosition} />
			<TemplateCollectionOverview>
				{
					templateBoards.map((board, index)=> (
						<TemplateCard key={index} {...board} templateType = {templateType} />
					))
				}
			</TemplateCollectionOverview>
		</div>
	)
}
// {
// 	<Query 
// 			pollInterval={500} 
// 			query={GET_BOOKS} 
// 			>
// 			{({ loading, error, data }) => {
// 				if (loading) return <CircularProgress />;
//                 if (error) return `Error! ${error.message}`;

//                 return (
//                 	<TemplateCollectionOverview>
// 	                	{data.boards.filter(board=>board.templateType==templateType).map((board, index) => (
// 	                		<TemplateCard key={index} {...board} />
// 	                	))}
// 	                </TemplateCollectionOverview>
//                 )
// 			}}
// 		</Query>
// }
