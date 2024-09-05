import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../MensProducts/MensProducts.css";

const MenProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products/men', {
          params: { category, subCategory, sort, search }
        });
  
        // Log the entire response
        console.log('Men response:', response);
  
        // Check the structure of the response
        if (response.data && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          setError('Unexpected response structure');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(`Failed to fetch products: ${err.response ? err.response.data.message : err.message}`);
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [category, subCategory, sort, search]);
  

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleSortChange = (e) => setSort(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleSubCategoryChange = (e) => setSubCategory(e.target.value);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="men-products">
      <h1>All Men's Products</h1>
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
          <option value="Hoodies">Hoodies</option>
          <option value="Trousers">Trousers</option>
          <option value="T-Shirts">T-Shirts</option>
          {/* Add other categories here */}
        </select>
        <select value={subCategory} onChange={handleSubCategoryChange}>
          <option value="">Select Sub-Category</option>
          <option value="New Arrival">New Arrival</option>
          <option value="Bestsellers">Bestsellers</option>
          <option value="Trending">Trending</option>
          {/* Add other sub-categories here */}
        </select>
      </div>
      <div className="product-grid">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p>Sub-Category: {product.subCategory}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default MenProducts;
