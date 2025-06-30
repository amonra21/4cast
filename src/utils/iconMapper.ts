import {
    faCloud,
    faSun,
    faCloudRain,
    faBolt,
    faSnowflake,
    faSmog,
    faQuestion,
} from "@fortawesome/free-solid-svg-icons";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export const getWeatherIcon = (iconName: string): IconDefinition => {
    switch (iconName.toLowerCase()) {
        case "sunny":
            return faSun;
        case "cloudy":
            return faCloud;
        case "rain":
            return faCloudRain;
        case "storm":
            return faBolt;
        case "snow":
            return faSnowflake;
        case "fog":
        case "mist":
            return faSmog;
        default:
            return faQuestion;
    }
};