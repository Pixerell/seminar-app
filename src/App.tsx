import { useEffect, useReducer } from 'react'
import './App.css'
import Seminar from './components/seminar_component/seminar'
import { initialState, seminarReducer } from './reducers/seminarReducers'
import { FETCH_ACTIONS } from './actions'
import axios from 'axios'

function App() {

  const [state,dispatch] = useReducer(seminarReducer, initialState)
  const {items, loading, error} = state

  const handleDelete = async (id: number) => {
    const previousState = [...items]; // Бэкап данных, если удаление не сработало
    try {
      // Симуляция ошибки, для бэкапа 
      // await new Promise((_, reject) => setTimeout(() => reject(new Error("СИМУЛИРУЮ ОШИБКУ")), 1000));

      // Оптимистичное удаление
      dispatch({ type: FETCH_ACTIONS.DELETE, id });
      await axios.delete(`http://localhost:3000/seminars/${id}`);
      console.log(`Seminar with ID: ${id} deleted successfully`);

    } catch (error) {
      console.error("Error deleting seminar:", error);
      // Если удаление не срабатывает - откат в предыдущий state
      alert("Failed to delete seminar. Restoring previous state.");
      dispatch({ type: FETCH_ACTIONS.RESTORE, data: previousState });
    }
  };

  useEffect(() => {
    dispatch({type: FETCH_ACTIONS.PROGRESS});

    const getItems = async () => {
      try{
        let response = await axios.get("http://localhost:3000/seminars");
        if (response.status === 200) {
          dispatch({type: FETCH_ACTIONS.SUCCESS, data: response.data});
        }
      } catch(err){
        console.error(err);
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        dispatch({ type: FETCH_ACTIONS.ERROR, error: errorMessage });    
      }
    }

    getItems();

  }, []);



  return (
    <>
    <div className='seminar_wrapper'>
      <h1>Список Семинаров</h1>
      <div className='seminar_list'>

        {
          loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}...</p>
          ) : (
           items.map((item) => (
            <Seminar
              key = {item.id}
              id={item.id}
              title = {item.title}
              description={item.description}
              date={item.date}
              time={item.time}
              photo={item.photo}
              onDelete={handleDelete}
            />
           ))
          )
        }
        
      </div>
    </div>
    </>
  )
}

export default App
