import './App.css'
import { ForecastList } from "./components/ForecastList.tsx"
import { ForecastFooter } from "./components/ForecastFooter.tsx"
import { LocationPicker } from "./components/map/LocationPicker.tsx";
import { WeatherLocationProvider } from "./context/WeatherLocationContext.tsx";
import { WeatherForecastProvider } from "./context/WeatherForecastContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { ThemeToggle } from "./components/ThemeToggle.tsx";
import { Logo } from "./components/Logo";
import "leaflet/dist/leaflet.css";

function App() {

  return (
      <main>
          <ThemeProvider>
              <WeatherLocationProvider>
                  <WeatherForecastProvider>
                  <div style={{ padding: "20px" }}>
                      <ThemeToggle />
                      <Logo />
                      <ForecastList/>
                      <LocationPicker/>
                      <ForecastFooter/>
                  </div>
                  </WeatherForecastProvider>
              </WeatherLocationProvider>
          </ThemeProvider>
      </main>
  )
}

export default App
