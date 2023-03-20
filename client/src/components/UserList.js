import React, { Component } from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    console.log("token: " + localStorage.token)
    axios
      .get(`${SERVER_HOST}/users`, { headers: { authorization: localStorage.token } })
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

//   handleDelete = (userId) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       axios
//         .delete(`${SERVER_HOST}/users/${userId}`, { headers: { authorization: localStorage.token } })
//         .then((res) => {
//           this.setState({ users: this.state.users.filter(user => user._id !== userId) });
//           console.log(res.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };

handleDelete = (userId) => {
    const accessLevel = localStorage.accessLevel;
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`${SERVER_HOST}/users`, {
          headers: { authorization: localStorage.token },
          data: { userId, accessLevel } // include user ID and access level in request body
        })
        .then((res) => {
          this.setState({ users: this.state.users.filter(user => user._id !== userId) });
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  
  

//   handleViewOrderHistory = (userId) => {
//     // Navigate to the order history page for the selected user
//     this.props.history.push(`/users/${userId}/orders`);
//   };

handleViewOrderHistory = (userEmail) => {
    // Navigate to the order history page for the selected user
  window.location.href = `/cart/orders/${userEmail}`;
  };
  

  render() {
    if (this.state.users.length === 0) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    } else {
      return (
        <div>
          <h1>User List</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => this.handleDelete(user._id)}>Delete User</button>
                    <button onClick={() => this.handleViewOrderHistory(user.email)}>View Order History</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default UserList;
