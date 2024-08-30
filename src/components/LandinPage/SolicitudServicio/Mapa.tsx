import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const API_KEY_MAPS = process.env.NEXT_PUBLIC_API_KEY_MAPS
  ? process.env.NEXT_PUBLIC_API_KEY_MAPS
  : "";

const containerStyle = {
  width: "100%",
  height: "400px",
};

interface MapaProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  onLocationChange: (newCoords: { lat: number; lng: number }) => void;
}

export const Mapa: React.FC<MapaProps> = ({
  coordinates,
  onLocationChange,
}) => {
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: API_KEY_MAPS });

  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: coordinates,
        zoom: 15,
      });
      setMap(mapInstance);
    }
  }, [isLoaded, coordinates]);

  useEffect(() => {
    if (map) {
      const marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        title: "Tu ubicación",
        draggable: true, // Make the marker draggable
      });

      // Set the map's center to the marker's position
      map.setCenter(coordinates);

      // Handle the event when the marker is dragged
      marker.addListener("dragend", (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const newCoords = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
          onLocationChange(newCoords);
        }
      });

      // Clean up the marker when the component unmounts
      return () => {
        marker.setMap(null);
      };
    }
  }, [map, coordinates, onLocationChange]);

  return isLoaded ? (
    <div ref={mapRef} style={containerStyle}></div>
  ) : (
    <div>Loading...</div>
  );
};
