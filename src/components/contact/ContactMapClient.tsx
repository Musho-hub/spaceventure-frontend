"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

type ContactMapProps = {
  coordinates: string;
  name: string;
  address: string;
};

const markerIcon = L.divIcon({
  className: "custom-map-marker",
  html: `
    <div style="
      width: 20px;
      height: 20px;
      background: #01B3A7;
      border: 3px solid white;
      border-radius: 9999px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.25);
    "></div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

function parseCoordinates(coordinates: string): [number, number] {
  const [lat, lng] = coordinates
    .split(",")
    .map((value) => Number(value.trim()));
  return [lat, lng];
}

export default function ContactMap({
  coordinates,
  name,
  address,
}: ContactMapProps) {
  const position = parseCoordinates(coordinates);

  return (
    <div className="relative z-0 overflow-hidden rounded-md">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="h-105 w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position} icon={markerIcon}>
          <Popup>
            <strong>{name}</strong>
            <br />
            {address}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
