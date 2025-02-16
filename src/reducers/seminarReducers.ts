import { FETCH_ACTIONS } from "../actions"
import {IAction, IState} from '../types/state_type'

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
          items: action.data || [],
        }
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