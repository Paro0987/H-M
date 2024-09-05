import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';  // Import Leaflet CSS
import '../pageStyle/FindStore.css';  // Import the CSS file

const stores = [
  { id: 1, name: 'Store 1', lat: 51.505, lng: -0.09 },
  { id: 2, name: 'Store 2', lat: 51.515, lng: -0.1 },
  { id: 3, name: 'Store 3', lat: 51.525, lng: -0.12 },
  // Add more store data as needed
];

const FindStore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStores, setFilteredStores] = useState(stores);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const mapInstance = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  useEffect(() => {
    if (map) {
      map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      filteredStores.forEach(store => {
        L.marker([store.lat, store.lng])
          .addTo(map)
          .bindPopup(store.name)
          .openPopup();
      });
    }
  }, [filteredStores, map]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const result = stores.filter(store =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStores(result);
  }, [searchTerm]);

  return (
    <div className="find-store-container">
      <div className="find-store-header">
      <div id="map" className="find-store-map"></div>
        <div className="find-store-search">
        <h2>Find a Store</h2>
          <input
            type="text"
            placeholder="Search for a store"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
      </div>
    </div>
  );
};

export default FindStore;
