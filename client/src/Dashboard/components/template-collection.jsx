import React from 'react';
import styled from 'styled-components';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// import BoardCard from './board-card';
import TemplateCard from "./template-card";
import CircularProgress from "@material-ui/core/CircularProgress";

const TemplateCollectionOverview = styled.div`
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
const GET_BOOKS = gql`
	query  {
		boards
		 {
		 	_id
        	title
		    backgroundImageUrl
		    isTemplate
		    templateType
		    visitedTime
		    isStarred
		    author
		    symbolIconUrl
		    brief
		    linkUrl
    	}
	}
`;
export default function TemplateCollection({match, templateType}) {
	return (
		<Query 
			pollInterval={500} 
			query={GET_BOOKS} 
			>
			{({ loading, error, data }) => {
				if (loading) return <CircularProgress />;
                if (error) return `Error! ${error.message}`;

                return (
                	<TemplateCollectionOverview>
	                	{data.boards.filter(board=>board.templateType==templateType).map((board, index) => (
	                		<TemplateCard key={index} {...board} />
	                	))}
	                </TemplateCollectionOverview>
                )
			}}
		</Query>
	)
}
