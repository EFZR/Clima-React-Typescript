import { createContext, ReactNode, useMemo, useState } from "react";
import { object, string, number, Output, parse } from "valibot";
// import { z } from "zod";
import axios from "axios";
import { SearchType } from "../types";

export type WeatherContextProps = {
  fetchWeather: (data: SearchType) => Promise<void>;
  weather: WeatherType;
  loading: boolean;
  notFound: boolean;
  hasWeatherData: boolean;
};

export const WeatherContext = createContext<WeatherContextProps>({
  fetchWeather: async () => { },
  weather: {
    name: "",
    main: {
      temp: 0,
      temp_min: 0,
      temp_max: 0,
    }
  },
  loading: false,
  notFound: false,
  hasWeatherData: false,
});

const initialWeather = {
  name: "",
  main: {
    temp: 0,
    temp_min: 0,
    temp_max: 0,
  }
};

// zod schema
// const Weather = z.object({
//   name: z.string(),
//   main: z.object({
//     temp: z.number(),
//     temp_min: z.number(),
//     temp_max: z.number(),
//   })
// });

// valibot schema
const WeatherSchema = object({
  name: string(),
  main: object({
    temp: number(),
    temp_min: number(),
    temp_max: number(),
  })
});

type WeatherType = Output<typeof WeatherSchema>;

const GeoSchema = object({
  lat: number(),
  lon: number(),
});

type GeoType = Output<typeof GeoSchema>;

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  //#region states

  const [weather, setWeather] = useState<WeatherType>(initialWeather);

  const [loading, setLoading] = useState(false);

  const [notFound, setNotFound] = useState(false);

  const hasWeatherData = useMemo(() => weather.name !== "", [weather])

  //#endregion

  //#region Functions

  async function fetchWeather(search: SearchType) {
    setLoading(true);

    setWeather(initialWeather);

    try {
      const apiKey = import.meta.env.VITE_API_KEY;

      const geoUrl =
        `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`

      const { data: geoData } = await axios.get(geoUrl);

      if (geoData.length === 0) {
        setNotFound(true);
        return;
      }

      const geoResult: GeoType = parse(GeoSchema, geoData[0]);

      const weatherUrl =
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoResult.lat}&lon=${geoResult.lon}&appid=${apiKey}`

      const { data: weatherData } = await axios.get(weatherUrl);

      // const result = Weather.safeParse(weatherData); // zod validation

      const result: WeatherType = parse(WeatherSchema, weatherData); // valibot validation

      if (result) {
        setWeather(result);
      }
    } catch (error) {
      console.log("fetchWeather", error);
    } finally {
      setLoading(false);
    }
  }

  //#endregion

  return (
    <WeatherContext.Provider value={{ fetchWeather, weather, loading, notFound, hasWeatherData }}>
      {children}
    </WeatherContext.Provider>
  );
};


