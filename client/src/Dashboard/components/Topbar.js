import React from "react";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import {withRouter} from 'react-router-dom';


function Topbar({match, templateType}) {
	

	
	const tokenUrl = localStorage.getItem('tokenUrl');
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href={`/${tokenUrl}/templates`}>
        Templates
      </Link>
      <Link color="inherit" href={`/${tokenUrl}/${templateType}`}>
        {templateType}
      </Link>
    </Breadcrumbs>
  );
}
export default withRouter(Topbar);