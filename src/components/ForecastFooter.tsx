import { useEffect, useState } from "react";
import { useWeatherLocation } from "../context/WeatherLocationContext";
import type { ForecastSummary } from "../types/ForecastSummary.ts";
import "./ForecastFooter.css";

export const ForecastFooter  = () => {
    const { location } = useWeatherLocation();
    const [summary, setSummary] = useState<ForecastSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSummary = async () => {
            if (!location) return;
            setLoading(true);
            try {
                const response = await fetch(
                    `http://localhost:8000/getWeeklySummary?lat=${location.lat}&lon=${location.lon}`
                );
                if (!response.ok) {
                    throw new Error("Błąd HTTP: " + response.status);
                }
                const data = await response.json();
                setSummary(data);
            } catch (err) {
                console.error("Błąd podczas pobierania podsumowania tygodnia:", err);
                setError("Nie udało się pobrać podsumowania tygodnia.");
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [location]);

    return (
        <div className="ForecastFooter">
            {loading && <p>Ładowanie podsumowania tygodnia...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && summary && (
                <>
                    <h2>Podsumowanie tygodnia:</h2>
                    <p>Data: {summary.date}</p>
                    <p>Średnia ekspozycja na słońce: {summary.averageSunExposition} h</p>
                    <p>Temperatury w tygodniu: {summary.minTemperature}°C - {summary.maxTemperature}°C</p>
                    <p>Ogólnie: {summary.summaryComment}</p>
                </>
            )}
        </div>
    );
};