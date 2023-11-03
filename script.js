// Function to update the distance on the webpage and show the "Congratulations" message
function updateDistance(position) {
    const currentLocation = position.coords;
    const definedPoint = { lat: 41.3, lon: 2.1 }; // Replace with your defined point's coordinates
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
