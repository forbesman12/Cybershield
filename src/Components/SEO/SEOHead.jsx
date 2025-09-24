import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title = "De-Hilltop Hotel - Luxury Mountain Resort & Hotel Booking",
  description = "Experience luxury at De-Hilltop Hotel, a premium mountain resort offering comfortable rooms, stunning views, and exceptional hospitality. Book your stay today.",
  keywords = "hotel booking, luxury hotel, mountain resort, De-Hilltop, accommodation, rooms, hospitality, vacation, travel",
  canonicalUrl = "https://dehilltophotels.com",
  ogImage = "/assets/IMG_0104.jpg",
  ogType = "website",
  structuredData = null,
  noIndex = false
}) => {
  const currentUrl = window.location.href;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots Meta */}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="De-Hilltop Hotel" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
