import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [position, setPosition] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect( () => {
    const success = (pos: GeolocationPosition) => {
      setPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    };

    const error = () => {
      console.error("Unable to retrieve your location");
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return { position };
};

export default useGeolocation;