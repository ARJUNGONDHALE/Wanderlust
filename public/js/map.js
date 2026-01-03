const mapDiv = document.getElementById("map");
const latitude = document.getElementById("latitude").value;
const longitude = document.getElementById("longitude").value;

//Leaflet code
if (mapDiv) {
  const map = L.map("map").setView([latitude, longitude], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // costum Icon Color
  var greenIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  L.marker([latitude, longitude], { icon: greenIcon })
    .addTo(map)
    .bindPopup("<h2></h2>Exact Location Provided after Booking ")
    .openPopup();
}
