import './seminar.css'
import { ISeminar } from '../../types/seminar_interface'

function Seminar({ title, description, date, time, photo, id }: ISeminar) {

    return (
      <div className='seminar_card'>
        <div className='top_row'>
            <img className='seminar_img' src={photo} alt={"seminar_pic" + {id}} />
            <h2>{title}</h2>
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
  