# Google Maps Integration

This component integrates Google Maps into the About page to show the hotel location.

## Setup Instructions

1. **Get a Google Maps API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/overview)
   - Create a new project or select an existing one
   - Enable the Maps JavaScript API
   - Create credentials (API Key)
   - Restrict the API key to your domain for security

2. **Configure the API Key:**
   - Copy your API key
   - Open the `.env` file in the root directory
   - Replace `your_google_maps_api_key_here` with your actual API key
   
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

3. **Features:**
   - Interactive Google Map centered on the hotel location
   - Custom marker with hotel information
   - Info window with hotel details and "Get Directions" link
   - Responsive design
   - Customizable zoom level and styling

## Component Props

- `center`: Object with lat/lng coordinates (default: Okpanam, Asaba)
- `zoom`: Map zoom level (default: 17)
- `width`: Map width (default: '100%')
- `height`: Map height (default: '450px')
- `title`: Hotel name for marker (default: 'De-HillTop Hotel and Apartments')
- `address`: Hotel address for info window

## Usage

```jsx
import GoogleMaps from '../GoogleMaps/GoogleMaps';

<GoogleMaps 
  center={{ lat: 6.21928, lng: 6.69030 }}
  zoom={17}
  title="De-HillTop Hotel and Apartments"
  address="Okpanam, Asaba, Delta State, Nigeria"
/>
```

## Security Note

Never commit your actual API key to version control. The `.env` file should be added to `.gitignore` to prevent accidental commits of sensitive information.
