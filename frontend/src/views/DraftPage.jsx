import React, { Component } from "react";
import SDCSection from "../components/SDCSection"

export default class DraftPage extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);

		this.state = {
			form_json: {} // TODO: Get the form JSON, either through the request body, component props, or API call 
		}
	}

	handleChange(value, questionID) {
		console.log(questionID + ":\t" + value);
	}

	render() {

		let sections = []

		this.state.form_json.sections.forEach((section) => {
		 sections.push(
			 <SDCSection section={section} onChange={this.handleChange}/>
		 );
		});

		const formStyle = {
		 marginTop: "80px",
		 marginLeft: "5%",
		 marginRight: "5%",
		 maringBottom: "30px",
		 backgroundColor: "#282c34"
		}

		return (
			<div className="draft-page">
				<div className="App-header">
					<div style={formStyle}>
						{sections}
					</div>
				</div>
			</div>
		);
	}
}
