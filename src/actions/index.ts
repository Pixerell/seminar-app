import { ISeminar } from "../types/seminar_interface";

const FETCH_ACTIONS = {
    PROGRESS: 'progress',
    SUCCESS: 'success',
    ERROR: 'error',
    DELETE: "DELETE",
    RESTORE: "RESTORE",
  }

export {FETCH_ACTIONS};
  
  type FetchActionsType = 
  | { type: typeof FETCH_ACTIONS.PROGRESS }
  | { type: typeof FETCH_ACTIONS.SUCCESS; data: ISeminar[] } 
  | { type: typeof FETCH_ACTIONS.ERROR; error: string }
  | { type: typeof FETCH_ACTIONS.DELETE; id: number }
  | { type: typeof FETCH_ACTIONS.RESTORE; data: ISeminar[] }; 


export type { FetchActionsType };

