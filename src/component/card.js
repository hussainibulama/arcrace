import './style.scss';
import moment from 'moment';
import DOMPurify from 'dompurify';

function sanitizeAndRemoveHTML(inputString) {
  const sanitizedString = DOMPurify.sanitize(inputString);
  const div = document.createElement('div');
  div.innerHTML = sanitizedString;
  return div.textContent || div.innerText || '';
}

const CalendarCard = ({title, date, description, image}) => {
  return (
    <div className='main-card'>
      <div className='card_header'>
        <div>
          <h3>{title}</h3>
          <p>{moment(date).format(`LLL`)}</p>
          <p>{moment(date).fromNow(true)} from now</p>
        </div>
      </div>
      <div className='card_body'>
        <div className='first_child'>
          <img src={image} alt='calendar ' />
        </div>
        <div className='second_child'>
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeAndRemoveHTML(description),
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default CalendarCard;
