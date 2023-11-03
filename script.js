// Function to calculate the distance between two points using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Function to update the distance on the webpage and show the "Congratulations" message
function updateDistance(position) {
    const currentLocation = position.coords;
    const definedPoint = { lat: 41.478357, lon: 2.311172  }; // Replace with your defined point's coordinates
    const distance = calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        definedPoint.lat,
        definedPoint.lon
    ) * 1000; // Convert distance to meters

    // Display the distance in meters at the center of the screen
    const distanceElement = document.getElementById("distance");
    distanceElement.textContent = distance.toFixed(2) + " meters";

    // Show the "Congratulations" message if the distance is less than 3 meters
    if (distance < 3) {
        const congratsMessage = document.getElementById("congratsMessage");
        congratsMessage.textContent = "Congratulations, you reached your destination!";
    } else {
        const congratsMessage = document.getElementById("congratsMessage");
        congratsMessage.textContent = "";
    }
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
// Function to update the distance on the webpage and show the "Congratulations" message
function updateDistance(position) {
    // Your existing code for calculating and updating the distance

    // Hide the "Congratulations" message initially
    const congratsMessage = document.getElementById("congratsMessage");
    congratsMessage.textContent = "";

    // Enable the refresh button
    const refreshButton = document.getElementById("refreshButton");
    refreshButton.disabled = false;
}

// Function to handle geolocation errors
function handleLocationError(error) {
    // Your existing code for handling geolocation errors

    // Enable the refresh button
    const refreshButton = document.getElementById("refreshButton");
    refreshButton.disabled = false;
}

// Function to refresh the location
function refreshLocation() {
    // Disable the refresh button to prevent multiple clicks
    const refreshButton = document.getElementById("refreshButton");
    refreshButton.disabled = true;

    // Clear the existing distance and "Congratulations" message
    document.getElementById("distance").textContent = "Calculating...";
    document.getElementById("congratsMessage").textContent = "";

    // Request the updated location
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(updateDistance, handleLocationError);
    } else {
        console.error("Geolocation is not available in your browser.");
    }
}

// Add an event listener to the refresh button
const refreshButton = document.getElementById("refreshButton");
refreshButton.addEventListener("click", refreshLocation);
