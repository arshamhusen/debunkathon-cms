import { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { Location } from "@/types";

const GOOGLE_MAPS_API_KEY = "AIzaSyBlz3BFmaEZsMJAw3AYOwsBitYyxmUs0dU";

type MapProps = {
  locations: Location[];
};

export function Map(props: MapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const center = useMemo(() => ({ lat: 4.17543, lng: 73.5119602 }), []);
  //@ts-ignore
  const [selectedMarker, setSelectedMarker] = useState<Coordinates | null>(
    center
  );

  if (!isLoaded) return <div>Loading...</div>;
  else {
    return (
      <div className="google-map border min-h-[600px]">
        {/* If google map not loaded */}

        {!isLoaded && <div>Loading...</div>}

        <GoogleMap
          zoom={16}
          center={center}
          mapContainerClassName="map-container"
        >
          {/* Markers */}
          {props.locations.map((location, index) => (
            <div className="flex flex-col space-y-2">
              <span className="block">{location.name}</span>
              {/* <MarkerF
                key={index}
                position={location.coordinate
                  .split(",")
                  .map((coord) => parseFloat(coord))}
                onClick={() => setSelectedMarker(location)}
              /> */}
            </div>
          ))}

          {/* Info Window */}
        </GoogleMap>
      </div>
    );
  }
}
