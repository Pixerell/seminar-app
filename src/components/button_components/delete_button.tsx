import { useState } from 'react';
import './buttons.css'
import ConfirmModal from '../confirm_modal/confirm_modal';

interface DeleteButtonProps {
    onDelete: () => void;
    seminar_title_prop:string;
  }

const Delete_Button: React.FC<DeleteButtonProps> = ({ onDelete, seminar_title_prop  }) => {

    const [showConfirm, setShowConfirm] = useState(false);
    const handleDeleteClick = () => {
    setShowConfirm(true);
    };





    return (
        <>
        <div className='button' onClick={handleDeleteClick}>
            <div className='button_imaging deleteb'/>
        </div>

        {showConfirm && (
            <ConfirmModal 
            message="Вы уверены, что хотите удалить этот семинар?" 
            seminar_title = {seminar_title_prop}
            onConfirm={() => {
                setShowConfirm(false);
                onDelete();
            }}
            onCancel={() => setShowConfirm(false)}
            />
        )}
        </>
    )
  }
  
  
  export default Delete_Button
  