import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../LadiesProducts/LadiesProducts.css";
import * as jwt_decode from 'jwt-decode'; // Import jwt_decode correctly

const LadiesProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://hennes-and-mauritz.onrender.com/products/ladies', {
          params: { category, subCategory, sort, search }
        });
        console.log('Ladies response:', response);
        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          setError('Unexpected response structure');
        }
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch products: ${err.response ? err.response.data.message : err.message}`);
        console.error('Error fetching products:', err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subCategory, sort, search]);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleSortChange = (e) => setSort(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleSubCategoryChange = (e) => setSubCategory(e.target.value);
  const handleProductClick = (product) => setSelectedProduct(product);

  const addToFavorites = (product) => {
    const token = localStorage.getItem('token'); 
    const decodedToken = jwt_decode(token); 
    const userId = decodedToken.userId; // Adjust this to match your token's structure
    axios.post(`/user/favourites/${product._id}`, { userId })
      .then(response => {
        console.log(response.data.message);
        navigate('/favourites');
      })
      .catch(error => {
        console.error("Error adding item to favorites:", error);
      });
  };

  const addToCart = (product) => {
    axios.post('/cart/add', {
      user: 'userId', // Replace with actual userId
      product: product._id,
      quantity: 1,
      price: product.price
    })
    .then(response => {
      console.log(response.data.message);
    })
    .catch(error => {
      console.error("Error adding item to cart:", error);
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="ladies-products">
      <h1>All Ladies Products</h1>
      <div className="filters">
        <input 
          type="text" 
          placeholder="Search..." 
          value={search} 
          onChange={handleSearchChange} 
        />
        <select value={sort} onChange={handleSortChange}>
          <option value="">Sort by</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="titleAsc">Title: A-Z</option>
          <option value="titleDesc">Title: Z-A</option>
        </select>
        <select value={category} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          <option value="New Arrival">New Arrival</option>
          <option value="Accessories">Accessories</option>
        </select>
        <select value={subCategory} onChange={handleSubCategoryChange}>
          <option value="">Select Sub-Category</option>
          <option value="Cardigans">Cardigans</option>
          <option value="Dresses">Dresses</option>
          <option value="Shirts">Shirts</option>
        </select>
      </div>
      <div className="product-grid">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card" onClick={() => handleProductClick(product)}>
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p>Sub-Category: {product.subCategory}</p>
              <div className="product-actions">
                <button onClick={(e) => { e.stopPropagation(); addToFavorites(product); }}>Add to Favorites</button>
                <button onClick={(e) => { e.stopPropagation(); addToCart(product); }}>Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      {selectedProduct && (
        <div className="product-details">
          <h2>{selectedProduct.title}</h2>
          <img src={selectedProduct.image} alt={selectedProduct.title} />
          <p>Price: ${selectedProduct.price}</p>
          <p>Category: {selectedProduct.category}</p>
          <p>Sub-Category: {selectedProduct.subCategory}</p>
          <p>Description: {selectedProduct.description}</p>
          <button onClick={() => setSelectedProduct(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default LadiesProducts;
