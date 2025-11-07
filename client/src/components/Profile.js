import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile({ user }) {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/api/my-orders/${user.id}`)
        .then(response => setMyOrders(response.data))
        .catch(error => console.error("Error fetching orders:", error));
    }
  }, [user]);

  if (!user) {
    return <h2>Please log in.</h2>;
  }

  return (
    <div className="profile-container">
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      
      <hr />
      
      <h3>My Orders</h3>
      {myOrders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <ul className="order-list">
          {myOrders.map(order => (
            <li key={order.orderId}>
              <strong>{order.artTitle}</strong> (Order ID: {order.orderId})
              <br />
              <small>Ordered on: {new Date(order.orderDate).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Profile;

