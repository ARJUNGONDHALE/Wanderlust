async function geocodeLocation(address) {
  //Open Street Map
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.length === 0) {
    throw new Error("Location not found");
  }

  return {
    latitude: data[0].lat,
    longitude: data[0].lon,
  };
}

async function setLocation(event) {
  event.preventDefault(); // Stoping The Defualt Beheviour Of Brawser

  const address = document.getElementById("location").value;

  try {
    const coords = await geocodeLocation(address);

    document.getElementById("latitude").value = coords.latitude;
    document.getElementById("longitude").value = coords.longitude;
    event.target.submit();
  } catch (e) {
    console.log(e);
  }
}
