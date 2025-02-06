import './App.css'
import Seminar from './components/seminar_component/seminar'

function App() {

  return (
    <>
    <div className='seminar_wrapper'>
      <h1>Список Семинаров</h1>
      <div className='seminar_list'>
        <Seminar></Seminar>     
      </div>
    </div>
    </>
  )
}

export default App
