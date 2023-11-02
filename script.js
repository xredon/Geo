// Function to calculate the distance between two points using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000;
}

// Function to update the distance on the webpage
function updateDistance(position) {
    const currentLocation = position.coords;
    const definedPoint = { lat: 41.478897, lon: 2.310161}; // Replace with your defined point's coordinates
    const distance = calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        definedPoint.lat,
        definedPoint.lon
    );
    document.getElementById("currentLocation").textContent = `[${currentLocation.latitude}, ${currentLocation.longitude}]`;
//    document.getElementById("definedPoint").textContent = `[${definedPoint.lat}, ${definedPoint.lon}]`;
    document.getElementById("distance").textContent = distance.toFixed(0); // Display the distance with no decimal places
}

// Function to handle geolocation errors
function handleLocationError(error) {
    console.error("Error getting location:", error.message);
}

// Check if geolocation is available
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(updateDistance, handleLocationError);
} else {
    console.error("Geolocation is not available in your browser.");
}
