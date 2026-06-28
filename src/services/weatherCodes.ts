export function getWeatherConditionKey(weatherCode: number) {
  if (weatherCode === 0) return "weatherClear";
  if ([1, 2, 3].includes(weatherCode)) return "weatherCloudy";
  if ([45, 48].includes(weatherCode)) return "weatherFog";
  if ([51, 53, 55, 56, 57].includes(weatherCode)) return "weatherDrizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
    return "weatherRain";
  }
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return "weatherSnow";
  if ([95, 96, 99].includes(weatherCode)) return "weatherStorm";

  return "weatherUnknown";
}