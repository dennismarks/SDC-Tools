import React, { Component } from "react";

export default class DraftPage extends Component {
	constructor(props) {
		super(props);
		console.log(this.props.match.params)
	}

	render() {
		return (
			<div className="draft-page">
				<div className="App-header">
					<h1>
						DraftPage
					</h1>
					<p>
						Patient: {this.props.match.params.patient_id}
						<br/>
						Form: {this.props.match.params.form_id}
					</p>
				</div>
			</div>
		);
	}
}