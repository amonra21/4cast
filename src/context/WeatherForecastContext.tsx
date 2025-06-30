import {createContext, useContext, useState, useEffect} from "react";
import { useWeatherLocation } from "./WeatherLocationContext";
import type { ReactNode } from "react";
import type { ForecastDay } from "../types/ForecastDay";

interface WeatherForecastContextType {
    forecast: ForecastDay[];
    loading: boolean;
    error: string | null;
}

const WeatherForecastContext = createContext<WeatherForecastContextType | undefined>(undefined);

export const useWeatherForecast = () => {
    const context = useContext(WeatherForecastContext);
    if (!context) {
        throw new Error("useWeatherForecast musi być użyty wewnątrz WeatherForecastProvider");
    }
    return context;
};

export const WeatherForecastProvider = ({ children }: { children: ReactNode }) => {
    const { location } = useWeatherLocation();

    const [forecast, setForecast] = useState<ForecastDay[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchForecast = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `http://localhost:8000/getWeeklyForecast?lat=${location.lat}&lon=${location.lon}`
                );

                if (!response.ok) {
                    throw new Error(`Błąd HTTP: ${response.status}`);
                }

                const data = await response.json();
                setForecast(data);
            } catch (err) {
                console.error("Błąd podczas pobierania danych pogodowych:", err);
                setError("Nie udało się pobrać danych pogodowych.");
            } finally {
                setLoading(false);
            }
        };

        fetchForecast();
    }, [location]);

    return (
        <WeatherForecastContext.Provider value={{ forecast, loading, error }}>
            {children}
        </WeatherForecastContext.Provider>
    );
};