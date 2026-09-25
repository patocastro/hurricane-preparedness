import { getCurrentWeather } from "../src/services/weatherService";

describe("getCurrentWeather", () => {
  const municipality = {
    name: "Mérida",
    latitude: 20.9674,
    longitude: -89.5926,
  } as any;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns formatted weather data when API request succeeds", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        current: {
          temperature_2m: 30,
          relative_humidity_2m: 70,
          wind_speed_10m: 15,
          weather_code: 1,
          time: "2026-09-23T18:00",
        },
      }),
    } as Response);
    const result = await getCurrentWeather(municipality);
    expect(result).toEqual({
      temperature: 30,
      humidity: 70,
      windSpeed: 15,
      weatherCode: 1,
      updatedAt: "2026-09-23T18:00",
    });
  });

  test("uses municipality coordinates in the request", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        current: {
          temperature_2m: 30,
          relative_humidity_2m: 70,
          wind_speed_10m: 15,
          weather_code: 1,
          time: "2026-09-23T18:00",
        },
      }),
    } as Response);

    await getCurrentWeather(municipality);

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);

    const url = (globalThis.fetch as jest.Mock).mock.calls[0][0];

    expect(url).toContain("latitude=20.9674");
    expect(url).toContain("longitude=-89.5926");
  });

  test("requests the expected weather fields", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        current: {
          temperature_2m: 30,
          relative_humidity_2m: 70,
          wind_speed_10m: 15,
          weather_code: 1,
          time: "2026-09-23T18:00",
        },
      }),
    } as Response);
    await getCurrentWeather(municipality);
    const url = (globalThis.fetch as jest.Mock).mock.calls[0][0];
    expect(url).toContain("temperature_2m");
    expect(url).toContain("relative_humidity_2m");
    expect(url).toContain("wind_speed_10m");
    expect(url).toContain("weather_code");
  });

  test("throws an error when API response is not successful", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
    } as Response);
    await expect(
      getCurrentWeather(municipality)
    ).rejects.toThrow(
      "Could not retrieve weather information."
    );
  });
});