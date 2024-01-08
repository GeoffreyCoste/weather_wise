export const getAirQuality = (aqi: number | undefined) => {
    if (!aqi) { return "no_desc" }
    else if (aqi > 0 && aqi < 20) { return "good" }
    else if (aqi >= 20 && aqi < 40) { return "fair" }
    else if (aqi >= 40 && aqi < 60) { return "moderate" }
    else if (aqi >= 60 && aqi < 80) { return "poor" }
    else if (aqi >= 80 && aqi < 100) { return "very_poor" }
    else if (aqi >= 100) { return "extremely_poor" }
}
