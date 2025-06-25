import Places from './Places.jsx';
import ErrorPage from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';
import { useFetch } from '../hooks/useFetch.js';

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();
  
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );

      resolve(sortedPlaces);
    });
  });
}


export default function AvailablePlaces({ onSelectPlace }) {
  const {isLoading, data: availablePlaces, error} = useFetch(fetchSortedPlaces, []);

  if (error) {
    return <ErrorPage title="An error ocurred!" message={error.message} />;
  }

  return (
      <Places
        title="Available Places"
        places={availablePlaces}
        isLoading={isLoading}
        loadingText="Loading places..."
        fallbackText="No places available."
        onSelectPlace={onSelectPlace}
      />
    );
}
