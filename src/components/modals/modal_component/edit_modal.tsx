import { useState } from 'react';
import ReactDOM from 'react-dom';
import './edit_modal.css'; 
import '../base_modal.css'
import { ISeminar } from '../../../types/seminar_interface';

interface EditModalProps {
  seminar: ISeminar;
  onClose: () => void;
  onSave: (updatedSeminar: ISeminar) => void;
}

const EditModal: React.FC<EditModalProps> = ({ seminar, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...seminar });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="edit-content base-modal">
        <h3>Редактировать Семинар</h3>
        <div className='edit-form'>
          <div className='edit-field'>
            <label>Название:</label>
            <input 
              type="text" 
              name="title"
              value={formData.title} 
              onChange={handleChange} 
            />
          </div>

          <div className='edit-field'>
            <label>Описание:</label>
            <textarea 
              name="description"
              value={formData.description} 
              onChange={handleChange} 
            />
          </div>

          <div className='edit-field'>
            <label>Дата:</label>
            <input 
              type="date" 
              name="date"
              value={formData.date} 
              onChange={handleChange} 
            />
          </div>

          <div className='edit-field'>
            <label>Время:</label>
            <input 
              type="time" 
              name="time"
              value={formData.time} 
              onChange={handleChange} 
            />
          </div>
          <div className='edit-field'>
            <label>Ссылка на фото:</label>
            <input 
              type="text" 
              name="photo"
              value={formData.photo} 
              onChange={handleChange} 
            />
          </div>
        </div>
        <div className="edit-buttons">
          <button onClick={() => onSave(formData)} className="edit-yes modal-button">Сохранить</button>
          <button onClick={onClose} className="edit-no modal-button">Отменить</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EditModal;
