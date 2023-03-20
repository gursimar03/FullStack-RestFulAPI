import React, { Component } from "react"
import { Link, Navigate as Redirect } from "react-router-dom"

import axios from "axios"
import { SERVER_HOST } from "../config/global_constants";


//Paypall

import { SANDBOX_CLIENT_ID } from "../config/global_constants"
import PayPalMessage from "./PayPalMessage"
import { PayPalButtons } from "@paypal/react-paypal-js"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import ScrollToTop from "../ScrollToTop";
import emailjs from 'emailjs-com';



class Cart extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            cart: [], //the users cart from the database
            productsInCart: [],
            total_price: 0,
            redirectToOrders: false,
        }
    }


    createOrder = (data, actions) => {
        return actions.order.create({ purchase_units: [{ amount: { value: parseFloat(this.state.productsInCart.reduce((a, b) => a + (b.product_price * b.product_quantity), 0)).toFixed(2) } }] })
    }

    sendConfirmationEmail = (userEmail, orderDetails) => {
        const emailServiceId = 'service_9fv842g';
        const emailTemplateId = 'template_ncymqlu';
        const emailUserId = 'tJvfyyQkDDB_UcRss';
        const emailTemplateParams = {
            userEmail: userEmail,
            orderDetails: orderDetails
        };

        emailjs.send(emailServiceId, emailTemplateId, emailTemplateParams, emailUserId)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (err) => {
                console.log('FAILED...', err);
            });
    }




     reduceProductQuantity = async (productId, size, quantityToReduce) => {
            try {

                localStorage.setItem('checkout',`${SERVER_HOST}/payment/success/${productId}/${size}/${quantityToReduce}`) 
              const response = await axios.post(`${SERVER_HOST}/payment/success/${productId}/${size}/${quantityToReduce}`);
          
              console.log(response.data.message);
              localStorage.setItem('cart', JSON.stringify(response));
            } catch (err) {
              console.error(err);
            }
          }
        


    onApprove = async (paymentData, actions) => {
        const totalPrice = parseFloat(
            this.state.productsInCart.reduce((a, b) => a + b.product_price * b.product_quantity, 0)
        ).toFixed(2);

        this.state.productsInCart.forEach((product) => {
            this.reduceProductQuantity(product._id, product.product_size, product.product_quantity);
          });

        const order = await actions.order.capture();

        const data = {
            paypalPaymentID: order.id,
            user_email: localStorage.email,
            product_array: this.state.productsInCart,
            price: totalPrice,
            product_date: new Date(),
        };

        axios
            .post(`${SERVER_HOST}/cart/checkout`, data)
            .then((res) => {
                console.log("PayPal payment success");
                console.log(res);
                // Send confirmation email
                const userEmail = localStorage.email;
                const orderDetails = this.state.productsInCart.map((product) => {
                    return `${product.product_name} - ${product.product_quantity} x $${product.product_price}`;
                }).join(', ');
                this.sendConfirmationEmail(userEmail, orderDetails);
                this.state.productsInCart.forEach((product) => {
                    axios
                        .delete(`${SERVER_HOST}/cart/${product.databaseID}/${localStorage.email}`)
                        .then((res) => {
                            console.log(res);
                            //reload the page
                            // setTimeout(() => {
                            //     this.setState({ redirectToOrders: true })
                            // }, 3000);
                            //windows.location reload to /success
                            window.location.replace("http://localhost:3000/success")
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                });
            })
            .catch((err) => {
                console.log(err);
            });
        }


 



    onError = errorData => {
        console.log("PayPal payment error")
    }


    onCancel = cancelData => {
        console.log("PayPal payment cancelled")
    }



    componentDidMount() {



        if (this.fetchCart) {
            let total_price = 0;
            this.state.cart.map((product) => {

                total_price += product.price;
            })
            this.setState({
                total_price: total_price
            })

            return;
        }

        if(this.state.redirectToOrders) {
            return <Redirect to="/success" />
        }


        this.fetchCart = axios.get(`${SERVER_HOST}/cart/users/${localStorage.email}`)
            .then(res => {
                if (res.data.errorMessage) {
                    console.log(res.data.errorMessage)
                } else {
                    if (!res.data.products_cart) return
                    this.setState({
                        cart: res.data.products_cart
                    }, () => {
                        this.state.cart.forEach((product) => {
                            const databaseID = product[0];
                            const id = product[0].substring(0, 24);
                            const size = parseFloat(product[0].substring(24, product[0].length));
                            const getProduct = async () => {
                                await axios.get(`${SERVER_HOST}/products/${id}`)
                                    .then(res => {
                                        if (res.data.errorMessage) {
                                            console.log(res.data.errorMessage)
                                        } else {


                                            this.setState(prevState => ({
                                                productsInCart: [...prevState.productsInCart,
                                                {
                                                    databaseID: databaseID,
                                                    product_id: res.data._id,
                                                    product_name: res.data.name,
                                                    product_gender: res.data.age,
                                                    product_image: res.data.productImage,
                                                    product_price: res.data.price,
                                                    product_quantity: product[1],
                                                    product_size: size,
                                                    product_brand: res.data.brand,
                                                    product_color: res.data.color,
                                                }
                                                ]
                                            }))
                                        }
                                    })
                            }
                            getProduct().then(() => {

                            });

                        })
                    })
                }
            }
            )
            .catch(err => console.log(err));

    }

    handleRemoveFromCart = (e) => {
        const id = e.target.value;

        axios.delete(`${SERVER_HOST}/cart/${id}/${localStorage.email}`)
            .then(res => {
                if (res.data.errorMessage) {
                    console.log(res.data.errorMessage)
                } else {
                    window.location.reload();
                }
            })
            .catch(err => console.log(err));
    };


    render() {
        if (this.state.productsInCart.length < 1) {
            return (
                <div className="cart">
                    <h3>You have no products in your cart</h3>
                </div>
            )
        }

        return (
            <div className="cart-page-container">
                <ScrollToTop />
                <div className="cart-page-items">
                    {this.state.productsInCart.map((product) =>
                        <div className="cart-item" key={product.databaseID}>
                            <div className="cart-item-image">
                                <img src={product.product_image} alt="product" />
                            </div>
                            <div className="cart-item-info">
                                <div className="cart-item-info-name">
                                    <Link to={`/products/${product.product_id}`}>{product.product_name}</Link>
                                    <p className="cart-item-price">€{product.product_price}</p>
                                </div>
                                <div className="cart-item-gender">
                                    <p>{product.product_gender}</p>
                                </div>
                                <div className="cart-item-sizeQuantity">
                                    <p>Size  {product.product_size}</p>
                                    <p>Quantity  {product.product_quantity}</p>
                                </div>
                                <div className="cart-item-remove">
                                    <button value={product.databaseID} onClick={this.handleRemoveFromCart}>Remove</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="cart-page-checkout">
                    <div className="cart-page-checkout-total">
                        <p>Total</p>
                        <p>
                            €{parseFloat(this.state.productsInCart.reduce((a, b) => a + (b.product_price * b.product_quantity), 0)).toFixed(2)}
                        </p>
                    </div>
                    <div className="cart-page-checkout-button">


                        <PayPalScriptProvider options={{ currency: "EUR", "client-id": SANDBOX_CLIENT_ID }}>
                            <PayPalButtons style={{ layout: "horizontal" }} createOrder={this.createOrder} onApprove={this.onApprove} onError={this.onError} onCancel={this.onCancel} />
                        </PayPalScriptProvider>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart;