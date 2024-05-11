import { formatTemperature } from "../helpers";
import useWeather from "../hooks/useWeather";
import styles from "../style/WeatherDetail.module.css";

export default function WeatherDetail() {
  const { weather } = useWeather();
  return (
    <div className={styles.container}>
      <h2>Clima de: {weather.name}</h2>
      <p className={styles.current}>{formatTemperature(weather.main.temp)}&deg;C</p>
      <div className={styles.temperatures}>
        <p>Min: <span>{formatTemperature(weather.main.temp_min)}&deg;C</span></p>
        <p>Max: <span>{formatTemperature(weather.main.temp_max)}&deg;C</span></p>
      </div>
    </div>
  )
}
