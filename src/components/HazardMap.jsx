import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function HazardMap({ layerToggles }) {
  const gilgitCenter = [36.1500, 74.5500];

  // States to store real road coordinates fetched from Routing API
  const [route1Coords, setRoute1Coords] = useState([]); // Gilgit to Hunza (Green)
  const [route2Coords, setRoute2Coords] = useState([]); // Hunza to Khunjerab (Red - Blocked)
  const [route3Coords, setRoute3Coords] = useState([]); // Jaglot to Skardu (Yellow)

  // Function to fetch exact road geometry (thousands of real road points) from OSRM API
  const fetchExactRoadRoute = async (startLngLat, endLngLat, setter) => {
    try {
      // OSRM requires Longitude,Latitude format
      const url = `https://router.project-osrm.org/route/v1/driving/${startLngLat[0]},${startLngLat[1]};${endLngLat[0]},${endLngLat[1]}?overview=full&geometries=geojson`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        // Convert [Lng, Lat] from API to [Lat, Lng] for Leaflet
        const latLngs = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
        setter(latLngs);
      }
    } catch (error) {
      console.error("Error fetching road geometry:", error);
    }
  };

  useEffect(() => {
    // 1. Gilgit [74.3083, 35.9208] to Hunza [74.6500, 36.3167]
    fetchExactRoadRoute([74.3083, 35.9208], [74.6500, 36.3167], setRoute1Coords);

    // 2. Hunza [74.6500, 36.3167] to Khunjerab Pass [75.4278, 36.8450] (EXACT KKH RED ROUTE)
    fetchExactRoadRoute([74.6500, 36.3167], [75.4278, 36.8450], setRoute2Coords);

    // 3. Jaglot [74.6167, 35.6833] to Skardu [75.5644, 35.2971]
    fetchExactRoadRoute([74.6167, 35.6833], [75.5644, 35.2971], setRoute3Coords);
  }, []);

  // Fake Hotels & Police Stations
  const fakeHotels = [
    { id: 1, name: 'Serena Hotel Gilgit', coords: [35.9280, 74.3120] },
    { id: 2, name: 'Luxus Hunza Resort', coords: [36.3200, 74.6600] },
    { id: 3, name: 'Passu Tourist Lodge', coords: [36.6850, 74.9000] },
    { id: 4, name: 'Skardu Continental Hotel', coords: [35.3050, 75.5500] }
  ];

  const fakePoliceStations = [
    { id: 1, name: 'Gilgit Central Police Station', coords: [35.9180, 74.3050] },
    { id: 2, name: 'Sost Security Checkpost', coords: [36.8100, 75.0600] },
    { id: 3, name: 'Jaglot Highway Police', coords: [35.6900, 74.6250] }
  ];

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={gilgitCenter}
        zoom={9}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        {/* REAL GOOGLE MAPS LAYER (Like InDrive / Uber) */}
        <TileLayer
          url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          attribution="&copy; Google Maps"
          maxZoom={20}
        />

        {/* Exact Road Routes */}
        {layerToggles.liveTraffic && (
          <>
            {/* Gilgit to Hunza (Open - Green) */}
            {route1Coords.length > 0 && (
              <Polyline positions={route1Coords} color="#10b981" weight={6} opacity={0.9} />
            )}

            {/* Hunza to Khunjerab (Blocked - Exact Red Road Curve) */}
            {route2Coords.length > 0 && (
              <Polyline positions={route2Coords} color="#ef4444" weight={7} opacity={0.95} />
            )}

            {/* Jaglot to Skardu (Caution - Yellow) */}
            {route3Coords.length > 0 && (
              <Polyline positions={route3Coords} color="#f59e0b" weight={6} opacity={0.9} />
            )}
          </>
        )}

        {/* Hotels Markers */}
        {layerToggles.hotels && fakeHotels.map(hotel => (
          <Marker key={hotel.id} position={hotel.coords}>
            <Popup>
              <strong className="text-amber-600">🏨 {hotel.name}</strong>
              <p className="text-xs text-slate-600">Available for tourists</p>
            </Popup>
          </Marker>
        ))}

        {/* Police Stations Markers */}
        {layerToggles.policeStations && fakePoliceStations.map(station => (
          <Marker key={station.id} position={station.coords}>
            <Popup>
              <strong className="text-blue-600">🛡️ {station.name}</strong>
              <p className="text-xs text-slate-600">24/7 Emergency Support</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}