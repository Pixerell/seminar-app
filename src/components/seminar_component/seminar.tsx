import './seminar.css'
import {ISeminar, SeminarProps } from '../../types/seminar_interface'
import Delete_Button from '../button_components/delete_button'
import Redact_Button from '../button_components/redact_button'
import def_img from '../../assets/def_image.png'

import React, { useCallback } from 'react'


function Seminar({ title, description, date, time, photo, id, onDelete, onEdit }: SeminarProps) {


  // колбэки против ререндеров
  const handleDelete = useCallback(() => {
    console.log(`Удаляем семинар номер: ${id}`);
    onDelete(id); 
  }, [id, onDelete]);

  const handleEdit = useCallback((updatedSeminar: ISeminar) => {
    console.log('Обновляем семинар:', updatedSeminar);
    onEdit(updatedSeminar);
  }, [onEdit]);

  // Проверка фотографии на пустоту или на битую ссылку - если битая то ставим изображение затычку
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = def_img;
  };

  const getImageSrc = (photo: string | undefined) => {
    return photo && photo.trim() ? photo.trim() : def_img;
  }

    return (
      <div className='seminar_card'>
        <div className='top_row'>
          <img 
              className='seminar_img' 
              src={getImageSrc(photo)}
              alt={`seminar_pic${id}`} 
              onError={handleImageError}
          />          
          <h2>{title}</h2>  
          <div className='buttons'>
            <Delete_Button onDelete={handleDelete} seminar_title_prop={title}/>
            <Redact_Button seminar={{id, title, description, date, time, photo }} onEdit={handleEdit} />          
          </div>
        </div>
        <div className='bottom_row'>
          <p className='seminar_desc'>
          {description}
          </p>
          <div className='seminar_datetime_block'>
            <span className='seminar_date'>{date}</span>
            <span className='seminar_time'>{time}</span>
          </div>
        </div>
      </div>
    )
  }
  // Мемо чтобы не ререндерить
  export default React.memo(Seminar);  