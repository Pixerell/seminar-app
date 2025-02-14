import {ISeminar} from './seminar_interface'


export interface IState {
  items: ISeminar[];
  loading: boolean;
  error: string | null;
}

export interface IAction {
  type: string; 
  data?: ISeminar[];
  error?: string;
}