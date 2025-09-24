import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';

const GoogleMaps = ({ 
  center = { lat: 6.21928, lng: 6.69030 }, // Okpanam, Asaba coordinates
  zoom = 17,
  width = '100%',
  height = '450px',
  title = 'De-HillTop Hotel and Apartments',
  address = 'Okpanam, Asaba, Delta State, Nigeria'
}) => {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);

  const mapContainerStyle = {
    width: width,
    height: height,
    borderRadius: '12px'
  };

  const mapOptions = {
    zoomControl: true,
    streetViewControl: true,
    mapTypeControl: true,
    fullscreenControl: true,
    scrollwheel: false,
    styles: [
      {
        featureType: 'poi.business',
        stylers: [{ visibility: 'on' }]
      },
      {
        featureType: 'transit',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }]
      }
    ]
  };

  // You'll need to add your Google Maps API key here
  // For security, it's better to use environment variables
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE';

  return (
    <div style={{ margin: '40px 0' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>Our Location</h3>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={zoom}
          options={mapOptions}
        >
          <Marker
            position={center}
            onClick={() => setIsInfoWindowOpen(true)}
            title={title}
          />
          
          {isInfoWindowOpen && (
            <InfoWindow
              position={center}
              onCloseClick={() => setIsInfoWindowOpen(false)}
            >
              <div style={{ padding: '10px', maxWidth: '200px' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>{title}</h4>
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>{address}</p>
                <div style={{ marginTop: '8px' }}>
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#1976d2', 
                      textDecoration: 'none',
                      fontSize: '12px'
                    }}
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMaps;
