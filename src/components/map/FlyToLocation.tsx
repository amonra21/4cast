import { useEffect } from "react";
import { useMap } from "react-leaflet";

export type Location = {
    lat: number;
    lng: number;
};

type FlyToLocationProps = {
    location: Location | null;
}

export const FlyToLocation = ({ location }: FlyToLocationProps) => {
    const map = useMap();

    useEffect(() => {
        if (location) {
            map.flyTo([location.lat, location.lng], 10);
        }
    }, [location, map]);

    return null;
};