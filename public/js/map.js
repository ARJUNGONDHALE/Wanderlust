const mapDiv = document.getElementById("map");
const latitude = document.getElementById("latitude").value;
const longitude = document.getElementById("longitude").value;

//Leaflet code
if (mapDiv) {
  const map = L.map("map").setView([latitude, longitude], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
}
