import type { Municipality } from "../data/municipalities";

export type CurrentWeather = {
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  updatedAt: string;
};

export async function getCurrentWeather(
  municipality: Municipality
): Promise<CurrentWeather> {
  const params = new URLSearchParams({
    latitude: String(municipality.latitude),
    longitude: String(municipality.longitude),
    current:
      "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
    timezone: "America/Merida",
  });

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Could not retrieve weather information.");
  }

  const data = await response.json();

  return {
    temperature: data.current.temperature_2m,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    weatherCode: data.current.weather_code,
    updatedAt: data.current.time,
  };
}