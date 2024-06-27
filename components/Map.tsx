"use client";
import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCountries } from "@/app/hooks/getCountries";
import { icon } from "leaflet";

const ICON = icon({
  iconUrl:
    "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
  iconSize: [40, 40],
});
export default function Map({ locationValue }: { locationValue: string }) {
  const { getCountryByValue } = useCountries();
  const latLang = getCountryByValue(locationValue)?.latLang;
  return (
    <div>
      <MapContainer
        scrollWheelZoom={false}
        className="h-[50vh] mt-5 rounded-lg relative z-0"
        center={latLang ?? [28.7041, 77.1025]}
        zoom={8}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker icon={ICON} position={latLang ?? [28.7041, 77.1025]} />
      </MapContainer>
    </div>
  );
}
