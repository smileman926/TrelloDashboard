import React from "react";
import styled from 'styled-components';

const SmallLogo = styled.div`
	float: left;
	border-radius: 3px;
	width: 48px;
	height: 48px;
	margin-right: 12px;
	background-image: url("https://a.trellocdn.com/prgb/dist/images/templates/category-sprite@2x.56e6839e477d82529dad.png");
	background-size: 293px 1352px;
	`
const LogoTitle = styled.h5`
	height: 48px;
	margin-bottom: 0px;
	display:flex;
	align-items: center;

`
export default function HeaderBar({title, imgPos}) {
	return (
		<div>
		
		<SmallLogo style={{ backgroundPosition: `${imgPos}`}}/>
		<LogoTitle>{`${title} Templates`}</LogoTitle>
		</div>
		)
}