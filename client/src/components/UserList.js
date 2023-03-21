import React, { Component } from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      chosenDelete: "",
    };
  }

  componentDidMount() {
    
    axios
      .get(`${SERVER_HOST}/users`, { headers: { authorization: localStorage.token } })
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((err) => {
        console.log(err);
      });

      axios.get(`${SERVER_HOST}/accessLevel/${localStorage.email}`).then(res => {
        this.setState({ level: res.data })
        
    })  
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

      axios
        .delete(`${SERVER_HOST}/users`, {
          headers: { authorization: localStorage.token },
          data: { userId, accessLevel } // include user ID and access level in request body
        })
        .then((res) => {
          this.setState({ users: this.state.users.filter(user => user._id !== userId) });
          console.log(res.data);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });

  };



  //   handleViewOrderHistory = (userId) => {
  //     // Navigate to the order history page for the selected user
  //     this.props.history.push(`/users/${userId}/orders`);
  //   };

  handleViewOrderHistory = (userEmail) => {
    // Navigate to the order history page for the selected user
    window.location.href = `/cart/orders/${userEmail}`;
  };

  showModal = (e) => {
    document.querySelector('.delete-Modal').style.top = 0;
    this.setState({ chosenDelete: e.target.value })

  }

  handleSub = (event) => {
    this.handleDelete(this.state.chosenDelete)
  }

  hideModal = () => {
    document.querySelector('.delete-Modal').style.top = "-5000px";
    this.setState({ chosenDelete: "" })
}


  render() {
    
    if(this.state.level >=2){
      return (
        <div>
        <div className="delete-Modal">
          <h1>Are you sure you want to delete this User?</h1>
          <p>Once you delete this User, there is no going back. Please be certain.</p>
          <button type="submit" onClick={this.handleSub}>Delete User</button>
          <button type="submit" onClick={this.hideModal}>Cancel</button>
        </div>
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
                  <button value={user._id} onClick={this.showModal}>Delete User</button>
                  <button onClick={() => this.handleViewOrderHistory(user.email)}>View Order History</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )
    }
  }
  }

export default UserList;


