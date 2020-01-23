import React from "react";
import marked from "marked";

export default class MDContent extends React.Component {
	constructor(props) {
		super()
		this.state = {
			markdown: null
		}
	}

	componentDidMount() {
		const endNum = this.props.numkey;
		console.log(endNum);
	  const readmePath = require(`./markdown-pages/ice-cream${endNum}.md`);

	  fetch(readmePath)
	    .then(response => {
	      return response.text()
	    })
	    .then(text => {
	      this.setState({
	        markdown: marked(text)
	      })
	    })
	}

	render() {
	  const { markdown } = this.state;

	  return (
	    <section>
	      <article dangerouslySetInnerHTML={{__html: markdown}}></article>
	    </section>
	  )
	}
}