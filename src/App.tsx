import { useEffect, useReducer } from 'react'
import './App.css'
import Seminar from './components/seminar_component/seminar'
import { initialState, seminarReducer } from './reducers/seminarReducers'
import { FETCH_ACTIONS } from './actions'
import axios from 'axios'
import { ISeminar } from './types/seminar_interface'

function App() {

  const [state,dispatch] = useReducer(seminarReducer, initialState)
  const {items, loading, error} = state

  const handleDelete = async (id: number) => {
    const previousState = [...items]; // Бэкап данных, если удаление не сработало
    try {
      // Симуляция ошибки, для бэкапа 
      // await new Promise((_, reject) => setTimeout(() => reject(new Error("СИМУЛИРУЮ ОШИБКУ")), 1000));

      // Оптимистичное удаление для лучшего UI/UX, особенно если есть задержки на серверах
      dispatch({ type: FETCH_ACTIONS.DELETE, id });
      await axios.delete(`http://localhost:3000/seminars/${id}`);
      console.log(`Семинар с ID: ${id} успешно удалён`);

    } catch (error) {
      console.error("Ошибка при удалении семинара:", error);
      // Если удаление не срабатывает - откат в предыдущий state
      alert("Не получилось удалить семинар, действие отменено.");
      dispatch({ type: FETCH_ACTIONS.RESTORE, data: previousState });
    }
  };

  const handleEdit = async (updatedSeminar: ISeminar) => {
    const previousState = [...items];
    console.log(updatedSeminar, "новый семинар");
    try {
      // Оптимистичное обновление
      dispatch({ type: FETCH_ACTIONS.UPDATE, seminar: updatedSeminar });
      const response = await axios.put(
        `http://localhost:3000/seminars/${updatedSeminar.id}`,
        updatedSeminar
      );
      console.log(response.status, "Status Code");

      if (response.status === 200) {
        console.log(`Семинар с ID: ${updatedSeminar.id} получил разрешение обновления`);
      } else {
        console.error("Ошибка сервера: ", response.statusText);
      }

    } catch (error) {
      console.error("Ошибка при обновлении семинара:", error);
      alert("Не получилось редактировать семинар ;(. Откатываем время назад.");
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
        const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
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
            <p>Подгружаю...</p>
          ) : error ? (
            <p>Ошибка - {error}...</p>
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
              onEdit={handleEdit}
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
