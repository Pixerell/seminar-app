import './seminar.css'


function Seminar() {

    return (
      <div className='seminar_card'>
        <div className='top_row'>
            <img className='seminar_img' src="https://picsum.photos/id/1/750/730" alt="seminar_pic" />
            <h2>Новинки Kosmoteros</h2>
        </div>
        <div className='bottom_row'>
          <p>
          Обзор новых средств и методик от Kosmoteros.
          </p>
          <div className='seminar_datetime_block'>
            <span className='seminar_date'>01.02.2025</span>
            <span className='seminar_time'>10:00</span>
          </div>
        </div>

      </div>
    )
  }
  
  export default Seminar
  