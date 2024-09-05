import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pageStyle/Favourites.css'; // Import the CSS file for styling

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get('https://hennes-and-mauritz.onrender.com/user/favourites', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        // Check if response.data.favourites is an array
        if (Array.isArray(response.data.favourites)) {
          setFavourites(response.data.favourites);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching favourites:', error);
        setError('Failed to fetch favourites');
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  const removeFromFavourites = async (itemId) => {
    try {
      await axios.delete(`https://hennes-and-mauritz.onrender.com/user/favourites/${itemId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFavourites(favourites.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item from favourites:', error);
      setError('Failed to remove item from favourites');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="favourites-page">
      <h1>Favourites</h1>
      <h2>SAVE YOUR FAVOURITE ITEMS</h2>
      {error && <p className="error">{error}</p>}
      <div className="favourites-list">
        {favourites.length === 0 ? (
          <p>Want to save the items that you love? Just click on the<br /> heart symbol beside the item and it will show up here.</p>
        ) : (
          favourites.map((item) => (
            <div key={item.id} className="favourite-item">
              <img src={item.img} alt={item.name} />
              <div className="favourite-item-details">
                <h2>{item.name}</h2>
                <p>Price: ₹{item.price}</p>
                <button onClick={() => removeFromFavourites(item.id)}>Remove from Favourites</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favourites;
