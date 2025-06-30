import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getWeatherIcon } from "../utils/iconMapper";
import { useWeatherForecast } from "../context/WeatherForecastContext";

export const ForecastList = () => {
    const { forecast, loading, error } = useWeatherForecast();

    if (loading) return <p> Ładowanie prognozy...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="ForecastList">
            {forecast.map((day) => (
                <div key={day.date} className="ForecastDayCard">
                    <h3>{day.date}</h3>
                    <FontAwesomeIcon icon={getWeatherIcon(day.icon)} size="2x" />
                    <p>Temp: {day.minTemperature}°C - {day.maxTemperature}°C</p>
                    <p>Humidity: {day.humidity}%</p>
                    <p>Wind: {day.windSpeed} km/h</p>
                    <p>Energy: {day.generatedEnergy} kWh</p>
                </div>
            ))}
        </div>
    );
};