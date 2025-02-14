import { useEffect, useReducer } from 'react'
import './App.css'
import Seminar from './components/seminar_component/seminar'
import { initialState, seminarReducer } from './reducers/seminarReducers'
import { FETCH_ACTIONS } from './actions'
import axios from 'axios'

function App() {

  const [state,dispatch] = useReducer(seminarReducer, initialState)
  const {items, loading, error} = state

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
