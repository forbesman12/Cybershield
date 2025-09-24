import React from 'react';
import Navbar from '../Homepage/Navbar/Navbar';
import ImgGallery from '../../assets/IMG_0104.jpg';
import Footer from '../Homepage/Footer/Footer';
import './gallery.css';
import SEOHead from '../SEO/SEOHead';
import { getHotelStructuredData } from '../SEO/structuredData';
import Gallery1 from '../../assets/H1.jpg';
import Gallery2 from '../../assets/H2.jpg';
import Gallery3 from '../../assets/H3.jpg';
import Gallery4 from '../../assets/H4.jpg';
import Gallery5 from '../../assets/H5.jpg';
import Gallery6 from '../../assets/H6.jpg';
import Gallery7 from '../../assets/J1.jpg';
import Gallery8 from '../../assets/J2.jpg';
import Gallery9 from '../../assets/J4.jpg';
import Gallery10 from '../../assets/L2.jpg';
import Gallery11 from '../../assets/IMG_0104.jpg';

const Gallery = () => {
  const galleryStructuredData = getHotelStructuredData();

  return (
    <>
      <SEOHead 
        title="Photo Gallery - De-Hilltop Hotel | Hotel Images & Virtual Tour"
        description="Explore our photo gallery showcasing the beautiful rooms, amenities, and facilities at De-Hilltop Hotel. Get a virtual tour of our luxury mountain resort."
        keywords="De-Hilltop Hotel gallery, hotel photos, hotel images, virtual tour, room photos, hotel facilities, mountain resort gallery"
        canonicalUrl="https://de-hilltop.com/gallery"
        structuredData={galleryStructuredData}
      />
      <Navbar />
      <div className="gallery-hero" style={{ backgroundImage: `url(${ImgGallery})`, height: '50vh', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

      {/* Gallery */}
      <div className="gallery-container">
       
        <div className="gallery-grid">
          <div className="gallery-item">
            <img src={Gallery1} alt="De-Hilltop Hotel luxury room with modern furnishing and comfortable bedding" />
          </div>
          <div className="gallery-item">
            <img src={Gallery2} alt="De-Hilltop Hotel spacious suite with elegant interior design" />
          </div>
          <div className="gallery-item">
            <img src={Gallery3} alt="De-Hilltop Hotel room with panoramic windows and natural lighting" />
          </div>
          <div className="gallery-item">
            <img src={Gallery4} alt="De-Hilltop Hotel modern bathroom with premium fixtures" />
          </div>
          <div className="gallery-item">
            <img src={Gallery5} alt="De-Hilltop Hotel dining area with contemporary furniture" />
          </div>
          <div className="gallery-item">
            <img src={Gallery6} alt="De-Hilltop Hotel reception area and lobby entrance" />
          </div>
          <div className="gallery-item">
            <img src={Gallery7} alt="De-Hilltop Hotel exterior building view in Okpanam, Asaba" />
          </div>
          <div className="gallery-item">
            <img src={Gallery8} alt="De-Hilltop Hotel comfortable seating area and lounge space" />
          </div>
          <div className="gallery-item">
            <img src={Gallery9} alt="De-Hilltop Hotel well-appointed guest room with city views" />
          </div>
          <div className="gallery-item">
            <img src={Gallery10} alt="De-Hilltop Hotel facility showcasing premium hospitality amenities" />
          </div>
          <div className="gallery-item">
            <img src={Gallery11} alt="De-Hilltop Hotel architectural design and building facade" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Gallery;