import Form from './components/Form';
import style from './style/App.module.css';

export default function App() {
  return (
    <>
      <h1 className={style.title}>Buscador del clima</h1>
      <div className={style.container}>
        <Form />
        <p>2</p>
      </div>
    </>
  )
}
