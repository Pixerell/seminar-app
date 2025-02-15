import './buttons.css'
import { ISeminar } from '../../types/seminar_interface'
import { useState } from 'react';
import EditModal from '../modals/modal_component/edit_modal';

interface RedactButtonProps {
    seminar: ISeminar;
    onEdit: (updatedSeminar: ISeminar) => void;
}


const Redact_Button: React.FC<RedactButtonProps> = ({ seminar, onEdit }) => {
    const [showEdit, setShowEdit] = useState(false);

    return (
        <>
            <div className='button' onClick={() => setShowEdit(true)}>
                <div className='button_imaging redactb'/>
            </div>

            {showEdit && (
                <EditModal 
                    seminar={seminar}
                    onClose={() => setShowEdit(false)}
                    onSave={(updatedSeminar) => {
                        setShowEdit(false);
                        onEdit(updatedSeminar);
                    }}
                />
            )}
        </>
    )
}

export default Redact_Button;