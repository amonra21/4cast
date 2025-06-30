import { useWeatherLocation } from "../../context/WeatherLocationContext";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { FlyToLocation } from "./FlyToLocation";
import "./LocationPicker.css";

export const LocationPicker = () => {
    const { location, setLocation } = useWeatherLocation();
    const [defaultCenter, setDefaultCenter] = useState<[number, number]>([52.237, 21.017]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            console.warn("Geolokacja nie jest wspierana przez przeglądarkę.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords: [number, number] = [position.coords.latitude, position.coords.longitude];
                setDefaultCenter(coords);
                setLocation({ lat: coords[0], lon: coords[1] });
            },
            (error) => console.warn("Błąd geolokacji:", error)
        );
    }, []);

    return (
        <div style={{ marginTop: "20px" }}>
            <SearchBox
                query={searchQuery}
                setQuery={setSearchQuery}
                onSearch={(lat, lon) => setLocation({ lat, lon })}
            />

            <div className="map-container">
                <MapContainer center={defaultCenter} zoom={6} className="map-container">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    <LocationMarker onSelect={(lat, lon) => setLocation({ lat, lon })} />
                    {location && (
                        <>
                            <FlyToLocation location={{ lat: location.lat, lng: location.lon }} />
                            <Marker position={{ lat: location.lat, lng: location.lon }} />
                        </>
                    )}
                </MapContainer>
            </div>

            {location && (
                <p className="coord-info">
                    Wybrane koordynaty: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
                </p>
            )}
        </div>
    );
};

const LocationMarker = ({ onSelect }: { onSelect: (lat: number, lon: number) => void }) => {
    useMapEvents({
        click(e) {
            onSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
};

const SearchBox = ({
                       query, setQuery, onSearch
                   }: {
    query: string,
    setQuery: (v: string) => void,
    onSearch: (lat: number, lon: number) => void
}) => {

    const handleSearch = async () => {
        if (!query) return;
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
            const results = await res.json();
            if (results?.length) {
                const { lat, lon } = results[0];
                onSearch(parseFloat(lat), parseFloat(lon));
            } else {
                alert("Nie znaleziono lokalizacji.");
            }
        } catch (err) {
            console.error("Błąd wyszukiwania:", err);
            alert("Błąd podczas wyszukiwania lokalizacji.");
        }
    };

    return (
        <div className="location-search-box">
            <input
                className="location-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Wpisz adres"
            />
            <button onClick={handleSearch} className="SearchButton">Szukaj</button>
        </div>
    );
};