import React from 'react';
import ReactDOM from 'react-dom';
import './confirm_modal.css'; 

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  seminar_title:string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, seminar_title, onConfirm, onCancel }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <div className='modal-top'>
          <h3>{message}</h3>
          <p>{seminar_title}</p>
        </div>
        <div className="modal-buttons">
          <button className="modal-confirm" onClick={onConfirm} >Да</button>
          <button className="modal-cancel" onClick={onCancel} >Нет</button>
        </div>
      </div>
    </div>,
    document.body 
  );
};

export default ConfirmModal;
