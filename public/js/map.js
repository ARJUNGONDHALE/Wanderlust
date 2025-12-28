const mapDiv = document.getElementById("map");

if (mapDiv) {
  const map = L.map("map").setView([19.8762, 75.3433], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
}
