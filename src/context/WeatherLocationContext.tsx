import { createContext, useContext, useState,} from "react";
import type {ReactNode} from "react";

export type Location = {
    lat: number;
    lon: number;
};

export interface WeatherLocationContextType {
    location: Location;
    setLocation: (loc: Location) => void;
}

const WeatherLocationContext = createContext<WeatherLocationContextType | undefined>(undefined);
WeatherLocationContext.displayName = "WeatherLocationContext";

export const useWeatherLocation = () => {
    const context = useContext(WeatherLocationContext);
    if (!context) {
        throw new Error("useWeatherLocation musi być użyty wewnątrz WeatherLocationProvider");
    }
    return context;
};

export const WeatherLocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [location, setLocation] = useState<Location>({ lat: 52.23, lon: 21.01 }); // Warszawa

    return (
        <WeatherLocationContext.Provider value={{ location, setLocation }}>
            {children}
        </WeatherLocationContext.Provider>
    );
};