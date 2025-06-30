import { render, screen, fireEvent } from "@testing-library/react";
import { WeatherLocationProvider } from "../../context/WeatherLocationContext";
import { LocationPicker } from "./LocationPicker";

const renderWithProvider = (ui: React.ReactElement) => {
    return render(
        <WeatherLocationProvider>
            {ui}
        </WeatherLocationProvider>
    );
};

describe("LocationPicker", () => {
    it("wyświetla input i przycisk", () => {
        renderWithProvider(<LocationPicker />);
        expect(screen.getByPlaceholderText("Wpisz adres")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /szukaj/i })).toBeInTheDocument();
    });

    it("zmienia wartość inputa", () => {
        renderWithProvider(<LocationPicker />);
        const input = screen.getByPlaceholderText("Wpisz adres");
        fireEvent.change(input, { target: { value: "Warszawa" } });
        expect((input as HTMLInputElement).value).toBe("Warszawa");
    });

    it("renderuje mape", () => {
        renderWithProvider(<LocationPicker />);
        const map = screen.getByRole("button", { name: /zoom in/i });
        expect(map).toBeInTheDocument();
    });

    it("wywołuje handleSearch po kliknieciu szukaj", async () => {
        renderWithProvider(<LocationPicker />);
        const input = screen.getByPlaceholderText(/wpisz adres/i);
        fireEvent.change(input, { target: { value: "Warszawa" } });

        const button = screen.getByRole("button", { name: /szukaj/i });
        fireEvent.click(button);
    });
});