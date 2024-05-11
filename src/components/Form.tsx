import { useForm } from "react-hook-form";
import type { SearchType } from "../types";
import { countries } from "../data";
import useWeather from "../hooks/useWeather";
import style from "../style/Form.module.css";
import Alert from "./Alert";

export default function Form() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SearchType>();
  const { fetchWeather } = useWeather();

  function onSubmit(data: SearchType) {
    console.log("submit");
    fetchWeather(data);
    reset();
  }

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.field}>
        <label htmlFor="city">Ciudad:</label>
        <input
          id="city"
          type="text"
          placeholder="Ciudad"
          autoComplete="off"
          {...register(
            "city",
            { required: "La ciudad es necesaria para completar la accion." }
          )}
        />
        {errors.city && <Alert>{errors.city.message}</Alert>}
      </div>

      <div className={style.field}>
        <label htmlFor="country">Pais:</label>
        <select
          id="country"
          {...register(
            "country",
            { required: "El pais es necesario para completar la accion." }
          )}
        >
          <option value="">-- Seleccione un País --</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>{country.name}</option>
          ))}
        </select>
        {errors.country && <Alert>{errors.country.message}</Alert>}
      </div>

      <input
        className={style.submit}
        type="submit"
        value="Consultar Clima"
      />
    </form>
  )
}