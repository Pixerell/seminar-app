export interface ISeminar {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    photo: string;
  }

export interface SeminarProps extends ISeminar {
  //  dispatch: React.Dispatch<FetchActionsType>; 
    onDelete: (id: number) => void;
    onEdit: (updatedSeminar: ISeminar) => void; 
}