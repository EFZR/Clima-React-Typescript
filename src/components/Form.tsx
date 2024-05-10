import { ChangeEvent, useState } from 'react';
import { countries } from "../data";
import type { SearchType } from '../types';
import style from '../style/Form.module.css';

export default function Form() {
  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: ''
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form className={style.form}>
      <div className={style.field}>
        <label htmlFor="city">Ciudad:</label>
        <input
          id='city'
          type="text"
          name='city'
          placeholder='Ciudad'
          value={search.city}
          onChange={handleChange}
        />
      </div>

      <div className={style.field}>
        <label htmlFor="pais">Pais:</label>
        <select
          name="pais"
          id="pais"
          value={search.country}
          onChange={handleChange}
        >
          <option value="">-- Seleccione un País --</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>{country.name}</option>
          ))}
        </select>
      </div>

      <input
        className={style.submit}
        type="submit"
        value="Consultar Clima"
      />
    </form>
  )
}