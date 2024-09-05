import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import "../Banner/Banner.css"; 
import img1 from "../../assets/Banner1.webp";
import img2 from "../../assets/Banner2.webp";
import img3 from "../../assets/Banner3.jpg";
import img4 from "../../assets/Banner5.jpg";
import img5 from "../../assets/Anamika.png";
import img6 from "../../assets/Banner4.jpg";

const Banner = () => {
  const [ladiesProducts, setLadiesProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLadiesProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products/ladies');
        const data = await response.json();
        console.log(data.products);
        setLadiesProducts(data.products || []); 
      } catch (error) {
        console.error('Error fetching ladies products:', error);
        setLadiesProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLadiesProducts();
  }, []);

  return (
    <div className="Banner">
      {/* First Banner Section */}
      <section className="banner">
        <div className="banner-image">
          <img src={img3} alt="Banner Image 3" />
        </div>
        <div className="banner-text">
          <h2>Neo-denim</h2>
          <Link to="/products/ladies">
            <button>Shop now</button>
          </Link>
        </div>
      </section>

      {/* Second Banner Section */}
      <section className="banner">
        <div className="banner-image">
          <img src={img4} alt="Banner Image 1" />
        </div>
        <div className="banner-text">
          <img src={img5} alt="Anamika Khanna" />
          <p>Launching 5 September at 11am</p>
          <Link to="https://www2.hm.com/en_in/free-form-campaigns/2040-anamika-khanna-hm.html">
            <button>Shop now</button>
          </Link>
        </div>
      </section>

      {/* Third Banner Section */}
      <section className="banner">
        <div className="banner-image">
          <img src={img6} alt="Banner Image 1" />
        </div>
        <div className="banner-text">
          <p>Elevated basics starting at ₹399</p>
          <p>Explore top & bottom wear</p>
          <div className="buttons">
            <Link to="/products/ladies">
              <button className="banner-btn">Ladies</button>
            </Link>
            <button className="banner-btn">Men</button>
            <button className="banner-btn">Baby & Kids</button>
          </div>
        </div>
      </section>

      {/* Product Carousel Section */}
      <section className="product-carousel">
        <h2>New Arrivals for Ladies</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="carousel">
            {Array.isArray(ladiesProducts) && ladiesProducts.length > 0 ? (
              ladiesProducts.map((product) => (
                <div key={product.id} className="product-card">
                <Link to="/products/ladies">
                  <img src={product.image} alt={product.image} />
                  <p>{product.title}</p>
                  <p>Rs. {product.price}</p>
                  </Link>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        )}
      </section>

      {/* Fourth Banner Section */}
      <section className="banner">
        <div className="banner-image">
          <img src={img1} alt="Banner Image 1" />
        </div>
        <div className="banner-image">
          <img src={img2} alt="Banner Image 2" />
        </div>
        <div className="banner-text">
          <p>Rs. 1,499.00</p>
          <p>Knitted cardigan</p>
          <h2>New Arrivals</h2>
          <h2>An update on the collegiate uniform.</h2>
          <Link to="/products/ladies">
            <button>Shop now</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Banner;
