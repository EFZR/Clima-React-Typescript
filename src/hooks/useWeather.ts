import { useContext } from "react";
import { WeatherContext, WeatherContextProps } from "../context/WeatherContext";

export default function useWeather(): WeatherContextProps {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }

  return context;
}
