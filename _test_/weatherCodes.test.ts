import { getWeatherConditionKey } from "../src/services/weatherCodes";

describe("getWeatherConditionKey", () => {
  test("returns weatherClear for code 0", () => {
    expect(getWeatherConditionKey(0)).toBe("weatherClear");
  });

  test("returns weatherCloudy for cloudy codes", () => {
    expect(getWeatherConditionKey(1)).toBe("weatherCloudy");
    expect(getWeatherConditionKey(2)).toBe("weatherCloudy");
    expect(getWeatherConditionKey(3)).toBe("weatherCloudy");
  });


  test("returns weatherFog for fog codes", () => {
    expect(getWeatherConditionKey(45)).toBe("weatherFog");
    expect(getWeatherConditionKey(48)).toBe("weatherFog");
  });

  test("returns weatherDrizzle for drizzle codes", () => {
    expect(getWeatherConditionKey(51)).toBe("weatherDrizzle");
    expect(getWeatherConditionKey(57)).toBe("weatherDrizzle");
  });

  test("returns weatherRain for rain codes", () => {
    expect(getWeatherConditionKey(61)).toBe("weatherRain");
    expect(getWeatherConditionKey(82)).toBe("weatherRain");
  });

  test("returns weatherSnow for snow codes", () => {
    expect(getWeatherConditionKey(71)).toBe("weatherSnow");
    expect(getWeatherConditionKey(86)).toBe("weatherSnow");
  });

  test("returns weatherStorm for storm codes", () => {
    expect(getWeatherConditionKey(95)).toBe("weatherStorm");
    expect(getWeatherConditionKey(99)).toBe("weatherStorm");
  });

  
  test("returns weatherUnknown for unsupported codes", () => {
    expect(getWeatherConditionKey(999)).toBe("weatherUnknown");
    expect(getWeatherConditionKey(-1)).toBe("weatherUnknown");
  });
});