// Structured Data Templates for SEO

export const getHotelStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Hotel",
  "name": "De-Hilltop Hotel and Apartments",
  "description": "Luxury hotel and apartments in Okpanam, Asaba offering 5 spacious duplex suites with 2 bedrooms, parlour, dining, kitchen, and modern amenities",
  "url": "https://dehilltophotels.com",
  "telephone": "+234-080-330-876-66",
  "email": "Info@dehilltopapartment.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ofili Drive, Last Redeem Bustop, Off Chief Ukah Way",
    "addressLocality": "Okpanam",
    "addressRegion": "Delta State",
    "postalCode": "320106",
    "addressCountry": "NG"
  },
  "image": "/assets/IMG_0104.png",
  "priceRange": "₦150,000 per duplex suite",
  "numberOfRooms": 5,
  "openingHours": "Mo-Su 00:00-23:59",
  "starRating": {
    "@type": "Rating",
    "ratingValue": "4.8"
  },
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Free WiFi",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Kitchen/Restaurant",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Free Parking",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "24/7 Access",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Duplex Suites",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Full Kitchen",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Balcony",
      "value": true
    }
  ]
});

export const getRoomStructuredData = (room) => ({
  "@context": "https://schema.org",
  "@type": "Hotel",
  "name": "De-Hilltop Hotel and Apartments",
  "hasAccommodation": {
    "@type": "Accommodation",
    "name": room.name || "Duplex Suite",
    "description": room.description || "Spacious duplex suite with 2 bedrooms, parlour, dining area, full kitchen, and balcony",
    "occupancy": {
      "@type": "QuantitativeValue",
      "maxValue": room.maxOccupancy || 4
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Free WiFi",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Air Conditioning",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Full Kitchen",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Dining Area",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Parlour/Living Room",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Balcony",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "2 Bedrooms",
        "value": true
      }
    ],
    "offers": {
      "@type": "Offer",
      "price": room.price || "150000",
      "priceCurrency": "NGN",
      "availability": "https://schema.org/InStock",
      "description": "Per duplex suite with 2 bedrooms, parlour, kitchen, dining, and balcony"
    }
  }
});

export const getLocalBusinessStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "De-Hilltop Hotel and Apartments",
  "description": "Luxury hotel and apartments in Okpanam, Asaba offering 5 spacious duplex suites with 2 bedrooms each, full kitchen, parlour, dining, and balcony",
  "url": "https://dehilltophotels.com",
  "telephone": "+234-080-330-876-66",
  "email": "Info@dehilltopapartment.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ofili Drive, Last Redeem Bustop, Off Chief Ukah Way",
    "addressLocality": "Okpanam",
    "addressRegion": "Delta State",
    "postalCode": "320106",
    "addressCountry": "NG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "6.21928",
    "longitude": "6.69030"
  },
  "openingHours": "Mo-Su 00:00-23:59",
  "priceRange": "₦150,000 per duplex suite",
  "image": "/assets/IMG_0104.png",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
});

export const getWebsiteStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "De-Hilltop Hotel",
  "url": "https://dehilltophotels.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://dehilltophotels.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
});

export const getBreadcrumbStructuredData = (breadcrumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});
