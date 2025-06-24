import { useState, useEffect } from 'react';

import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/places');
      const resData = await response.json();
      setAvailablePlaces(resData.places);
      setisLoading(false);
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
