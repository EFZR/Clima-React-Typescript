import Form from './components/Form';
import WeatherDetail from './components/WeatherDetail';
import Spinner from './components/Spinner';
import useWeather from './hooks/useWeather';
import Alert from './components/Alert';
import style from './style/App.module.css';

export default function App() {
  const { hasWeatherData, loading, notFound } = useWeather();
  return (
    <>
      <h1 className={style.title}>Buscador del clima</h1>
      <div className={style.container}>
        <Form />
        {loading && <Spinner />}
        {hasWeatherData && <WeatherDetail />}
        {notFound && <Alert>La ciudad no fue encontrada.</Alert>}
      </div>
    </>
  )
}
