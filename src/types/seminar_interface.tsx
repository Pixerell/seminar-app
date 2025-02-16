export interface ISeminar {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    photo: string;
  }

export interface SeminarProps extends ISeminar {
  //  dispatch: React.Dispatch<FetchActionsType>; 
    onDelete: (id: string) => void;
    onEdit: (updatedSeminar: ISeminar) => void; 
}