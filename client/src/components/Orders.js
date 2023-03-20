import React, { Component } from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${SERVER_HOST}/cart/orders/${localStorage.email}`)
      .then((res) => {
        if (res.data.errorMessage) {
          console.log(res.data.errorMessage);
        } else {
          this.setState({
            orders: res.data,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  HandleReturn = (id,quantity,size,paypalID) => {

    console.log(id,quantity,size)
    axios.delete(`${SERVER_HOST}/sales/delete/${paypalID}}`).then((res) => {
      console.log(res.data);
    });


    // axios
    //   .put(`${SERVER_HOST}/product/return/${id}/${size}/${quantity}`)
    //   .then((res) => {
    //     if (res.data.errorMessage) {
    //       console.log(res.data.errorMessage);
    //     } else {
          
    //       axios.delete(`${SERVER_HOST}/sales/delete/${paypalID}}`)
          
    //       window.location.reload();

    //     }
    //   })
    //   .catch((err) => console.log(err));


  }


  render() {
    const { orders } = this.state;

    if (orders.length < 1) {
      return (
        <div className="cart">
          <h3>You have no orders</h3>
        </div>
      );
    }

    return (
      <div className="cart-page-container">
        <div className="cart-page-items">
          {orders.map((order) => (
              
            <div key={order.paypalPaymentID} className="cart-item">
              <div className="cart-item-image">
                <img
                  src={order.product_array[0].product_image}
                  alt={order.product_array[0].product_name}
                />
              </div>
              <div className="cart-item-info">
                <div className="cart-item-info-name">
                  <h5>{order.product_array[0].product_name}</h5>
                  <p className="cart-item-price">{order.price}</p>
                </div>
                <div className="cart-item-details">
                  <p>
                    <strong>Date: </strong>
                    {new Date(order.product_date).toLocaleString()}
                  </p>
                  <p>
                    <strong>Quantity: </strong>
                    {order.product_array[0].product_quantity}
                  </p>
                  <p>
                    <strong>Size: </strong>
                    {order.product_array[0].product_size}
                  </p>
                  <p>
                    <strong>Color: </strong>
                    {order.product_array[0].product_color}
                  </p>
                  <p>
                    <strong>Brand: </strong>
                    {order.product_array[0].product_brand}
                  </p>
                  <p>
                    <small className="text-muted">
                      PayPal Payment ID: {order.paypalPaymentID}
                    </small>
                  </p>
                
                  <button onClick={() => this.HandleReturn(order.product_array[0].product_id, order.product_array[0].product_quantity , order.product_array[0].product_size,order.paypalPaymentID)} className="return-button">Return Item</button>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Orders;
