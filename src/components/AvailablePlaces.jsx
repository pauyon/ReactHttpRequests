import { useState, useEffect } from 'react';

import Places from './Places.jsx';
import ErrorPage from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost:3000/places');
        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message || 'Could not fetch places.');
        }

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            resData.places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
        });

      } catch (error) {
        setError(error);
      }
      finally {
        setIsLoading(false);
      }

    }

    fetchPlaces();

    // Longway of fetching data without async/await
    // You cant set functions as async if they are components or
    // on the useEffect method itself. Only on user defined functions.
    // fetch('http://localhost:3000/places').then((response) => {
    //   return response.json()
    // }).then((resData) => {
    //   setAvailablePlaces(resData.places);
    // });
  }, []);

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
