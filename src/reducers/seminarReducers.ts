import { FETCH_ACTIONS } from "../actions"
import { ISeminar } from "../types/seminar_interface";
import {IAction, IState} from '../types/state_type'


// Мемоизация и превращение приходящих айдишников в строки так как json server не поддерживает non-string айди
const memoizedTransform = (() => {
  const cache = new Map<string, ISeminar[]>(); 

  return (data: ISeminar[]): ISeminar[] => {
    const dataKey = JSON.stringify(data); 
    if (cache.has(dataKey)) {
      return cache.get(dataKey)!;
    }

    const result = data.map((seminar) => ({
      ...seminar,
      id: String(seminar.id), 
    }));

    cache.set(dataKey, result); 
    return result;
  };
})();

const initialState: IState = {  
    items: [],
    loading: false,
    error: null,
  }


  const seminarReducer = (state: IState, action:IAction) => {

    switch (action.type) {
      case FETCH_ACTIONS.PROGRESS: {
        return {
          ...state,
          loading: true,
        }
      }
  
      case FETCH_ACTIONS.SUCCESS: {
        return {
          ...state,
          loading: false,
          items: action.data ? memoizedTransform(action.data) : [],
        };
      }
  
      case FETCH_ACTIONS.ERROR: {
        return {
          ...state,
          loading: false,
          error: action.error || 'Ошибка!',
        }
      }
      
      case FETCH_ACTIONS.UPDATE:
        if (!action.seminar) {
          console.error("Нет семинара, либо он не выделен.");
          return state; 
        }
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.seminar?.id ? action.seminar : item
          ),
        };
      
       case FETCH_ACTIONS.DELETE:
        return {
          ...state,
          items: state.items.filter(seminar => seminar.id !== action.id),
        }
      default: {
        return state;
      }
      case FETCH_ACTIONS.RESTORE:
        return {
          ...state,
          items: action.data || [],
        };      
    }
  
  }

  export {seminarReducer, initialState}