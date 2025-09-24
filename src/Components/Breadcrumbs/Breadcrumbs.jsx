import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = ({ customCrumbs = null }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Default breadcrumb mapping
  const breadcrumbNameMap = {
    '': 'Home',
    'rooms': 'Rooms',
    'about': 'About Us',
    'contact': 'Contact',
    'gallery': 'Gallery',
    'booking-confirmation': 'Booking Confirmation',
    'booking-access': 'Booking Access',
    'booking-success': 'Booking Success'
  };

  // If custom breadcrumbs are provided (e.g., for room details), use them
  if (customCrumbs) {
    return (
      <nav className="breadcrumbs" aria-label="Breadcrumb navigation">
        <ol className="breadcrumb-list">
          {customCrumbs.map((crumb, index) => (
            <li key={index} className="breadcrumb-item">
              {index < customCrumbs.length - 1 ? (
                <Link to={crumb.path} className="breadcrumb-link">
                  {crumb.name}
                </Link>
              ) : (
                <span className="breadcrumb-current" aria-current="page">
                  {crumb.name}
                </span>
              )}
              {index < customCrumbs.length - 1 && (
                <span className="breadcrumb-separator" aria-hidden="true"> / </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  // Generate automatic breadcrumbs based on URL
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    ...pathnames.map((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
      const name = breadcrumbNameMap[value] || value.charAt(0).toUpperCase() + value.slice(1);
      
      return {
        name: name,
        path: to
      };
    })
  ];

  // Don't show breadcrumbs on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb navigation">
      <ol className="breadcrumb-list">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="breadcrumb-item">
            {index < breadcrumbs.length - 1 ? (
              <Link to={crumb.path} className="breadcrumb-link">
                {crumb.name}
              </Link>
            ) : (
              <span className="breadcrumb-current" aria-current="page">
                {crumb.name}
              </span>
            )}
            {index < breadcrumbs.length - 1 && (
              <span className="breadcrumb-separator" aria-hidden="true"> / </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
