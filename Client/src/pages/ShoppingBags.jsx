import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pageStyle/ShoppingBag.css';

const ShoppingBag = ({ userId }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (userId) {
      // Fetch cart items for the specific user
      axios.get('/cart', { params: { userId } })
        .then(response => {
          const cartItems = response.data.data?.items || []; // Adjust based on your API response structure
          setItems(cartItems);
        })
        .catch(error => {
          console.error("Error fetching cart items:", error);
        });
    }
  }, [userId]);

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const addToCart = (product) => {
    axios.post('/cart/add', {
      user: userId,
      product: product._id, // Assuming product ID or similar identifier
      quantity: 1, // Default quantity, adjust as needed
      price: product.price // Assuming price is part of the product object
    })
    .then(response => {
      console.log(response.data.message);
      // Optionally update the cart items in the state
      setItems(prevItems => [...prevItems, response.data.item]);
    })
    .catch(error => {
      console.error("Error adding item to cart:", error);
    });
  };

  const updateCartItem = (id, newQuantity) => {
    axios.patch(`/cart/update/${id}`, { quantity: newQuantity })
      .then(response => {
        console.log(response.data.message);
        // Update the state with the new quantity
        setItems(prevItems => prevItems.map(item =>
          item._id === id ? { ...item, quantity: newQuantity } : item
        ));
      })
      .catch(error => {
        console.error("Error updating cart item:", error);
      });
  };

  const deleteCartItem = (id) => {
    axios.delete(`/cart/delete/${id}`)
      .then(response => {
        console.log(response.data.message);
        // Remove the item from the state
        setItems(prevItems => prevItems.filter(item => item._id !== id));
      })
      .catch(error => {
        console.error("Error deleting cart item:", error);
      });
  };

  const checkout = () => {
    axios.delete('/cart/checkout', { data: { userId } })
      .then(response => {
        console.log(response.data.message);
        setItems([]); // Clear items after checkout
      })
      .catch(error => {
        console.error("Error during checkout:", error);
      });
  };

  return (
    <div className="shopping-bag-page">
      <h1>Shopping Bag</h1>
      <div className="shopping-bag-content">
        {items.length === 0 ? (
          <>
            <p>Your shopping bag is empty.</p>
            <button className="sign-in-button">Sign In</button>
          </>
        ) : (
          <>
            <div className="shopping-bag-items">
              {items.map((item) => (
                <div key={item._id} className="shopping-bag-item">
                  <div className="item-details">
                    <h2>{item.product.name}</h2> {/* Adjust as per your item structure */}
                    <p>Price: Rs. {item.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-total">
                    <p>Total: Rs. {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => updateCartItem(item._id, item.quantity + 1)}>Increase Quantity</button>
                    <button onClick={() => updateCartItem(item._id, item.quantity - 1)}>Decrease Quantity</button>
                    <button onClick={() => deleteCartItem(item._id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="shopping-bag-summary">
              <h2>Order Summary</h2>
              <p>Total Price: Rs. {totalPrice.toFixed(2)}</p>
            </div>
          </>
        )}
        <div className="shopping-bag-checkout">
          <div className="payment-options">
            <p>We accept:</p>
            {/* Image of payment options */}
          </div>
          <p>Prices and delivery costs are not confirmed until you've reached the checkout.</p>
          <p>7-days free return. <a href="#">Read more about return and refund policy</a></p>
          <p>Customers will receive SMS/WhatsApp notifications regarding order status on the registered phone number.</p>
          <button className="checkout-button" onClick={checkout}>Proceed to Checkout</button>
          <button className="continue-shopping-button">Continue Shopping</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBag;
