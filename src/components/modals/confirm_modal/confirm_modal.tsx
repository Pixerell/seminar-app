import React from 'react';
import ReactDOM from 'react-dom';
import './confirm_modal.css'; 
import '../base_modal.css'

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  seminar_title:string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, seminar_title, onConfirm, onCancel }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="confirm-content base-modal">
        <div className='confirm-top'>
          <h3>{message}</h3>
          <p>{seminar_title}</p>
        </div>
        <div className="confirm-buttons">
          <button className="confirm-yes modal-button edit-button" onClick={onConfirm} >Да</button>
          <button className="confirm-no modal-button edit-button" onClick={onCancel} >Нет</button>
        </div>
      </div>
    </div>,
    document.body 
  );
};

export default ConfirmModal;
