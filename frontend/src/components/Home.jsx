import React, { Component } from "react";
import axios from "axios";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      users: []
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  getUsers() {
    axios.get("http://localhost:3001/user/").then(response => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map(user => user.username)
        });
      }
      console.log(this.state.users);
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    };

    console.log(user);
    axios.post("http://localhost:3001/user/add", user).then(res => {
      console.log(res.data);
      this.getUsers();
    });

    this.setState({
      username: ""
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Add a New User:</h1>
          <div>
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
              <input type="submit" value="Save" />
            </form>
          </div>
          <br />
          <h3>Current users in a database:</h3>
          <div>
            {this.state.users.map((item, index) => (
              <em key={index}>{item} </em>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
