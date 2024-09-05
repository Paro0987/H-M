import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './pages/HomePage';
import CustomerService from './pages/CustomerService';
import Newsletter from './pages/Newsletter';
import FindStore from './pages/FindStore';
import Favourites from './pages/Favourites';
import ShoppingBag from './pages/ShoppingBags';
import LadiesProducts from './Components/LadiesProducts/LadiesProducts'; 
import Footer from './Components/Footer/Footer';
import MenBestsellers from './Components/MensProducts/MensProducts';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/customer-service" element={<CustomerService />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/find-store" element={<FindStore />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/shopping-bag" element={<ShoppingBag />} />
        <Route path="/products/ladies" element={<LadiesProducts />} /> {/* Add the route for Ladies Products */}
        <Route path="/products/men"  element={<MenBestsellers />} /> 
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
