export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || 'Could not fetch places.');
    }

    return resData.places;
}