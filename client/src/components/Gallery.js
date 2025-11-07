import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Gallery({ user }) {
  const [artworks, setArtworks] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/gallery')
      .then(response => setArtworks(response.data))
      .catch(error => console.error("Error fetching art:", error));
  }, []);

  const handlePlaceOrder = async (art) => {
    if (!user) {
      setNotification('You must be logged in to place an order.');
      setTimeout(() => setNotification(''), 3000);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/order', {
        userId: user.id,
        artId: art.id,
        artTitle: art.title
      });
      
      setNotification(`'${art.title}' has been added to your orders!`);
      setTimeout(() => setNotification(''), 3000);
      
    } catch (error) {
      setNotification('There was an error placing your order.');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  return (
    <div className="gallery-container">
      <h2>Art Gallery</h2>
      
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      <div className="art-grid">
        {artworks.map(art => (
          <div key={art.id} className="art-card">
            <img src={art.image} alt={art.title} />
            <h3>{art.title}</h3>
            <p>By: {art.artist}</p>
            <p>${art.price}</p>
            <button onClick={() => handlePlaceOrder(art)}>
              Place Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;

