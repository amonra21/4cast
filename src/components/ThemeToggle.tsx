import { useTheme } from "../context/ThemeContext";

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: theme === "dark" ? "#fff" : "#333",
            color: theme === "dark" ? "#000" : "#fff",
            cursor: "pointer"
        }}>
            Przełącz na {theme === "dark" ? "jasny" : "ciemny"} motyw
        </button>
    );
};