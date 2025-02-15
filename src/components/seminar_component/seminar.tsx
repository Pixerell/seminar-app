import './seminar.css'
import { ISeminar } from '../../types/seminar_interface'
import Delete_Button from '../button_components/delete_button'
import Redact_Button from '../button_components/redact_button'
import def_img from '../../assets/def_image.png'

function Seminar({ title, description, date, time, photo, id }: ISeminar) {

      const handleDelete = () => {
        console.log(`Deleting seminar with ID: ${id}`);
    };

    const handleEdit = () => {
      console.log(`Editing with ID: ${id}`);
  };


    return (
      <div className='seminar_card'>
        <div className='top_row'>

          <img 
              className='seminar_img' 
              // Проверка фотографии на пустоту или на битую ссылку - если битая то ставим изображение затычку
              src={photo && photo.trim() ? photo : def_img}
              alt={`seminar_pic${id}`} 
              onError={(e) => e.currentTarget.src = def_img}
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
  
  export default Seminar
  