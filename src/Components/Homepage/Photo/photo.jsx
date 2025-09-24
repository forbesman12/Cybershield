import React from "react";
import './photo.css';
import img1 from "../../../assets/H3.jpg";
import img2 from "../../../assets/H4.jpg";
import img3 from "../../../assets/J1.jpg";
import img4 from "../../../assets/IMG_0079.jpg";
import img5 from "../../../assets/IMG_0104.jpg";
import img6 from "../../../assets/IMG_0107.jpg";
import img7 from "../../../assets/L2.jpg";

const Photo = () => {
  const images = [img1, img2, img3, img4, img5, img6, img7];

  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <h2>Our Gallery</h2>
        <p>A glimpse into our space and beautiful moments captured.</p>
      </div>

      <div className="gallery-scroll">
        {images.map((img, index) => (
          <div key={index} className="gallery-item">
            <img src={img} alt={`gallery-${index}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Photo;
