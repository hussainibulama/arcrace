import './App.scss';
import {useEffect, useCallback, useState} from 'react';
import CalendarCard from './component/card';
import axios from 'axios';

function App() {
  const [activeMonth, setActiveMonth] = useState(3);
  const [data, setData] = useState([]);
  const getRefreshToken = () => {
    // generate token and store to localstorage
    axios
      .post(
        'https://api.arenaracingcompany.co.uk/auth',
        {},
        {
          headers: {
            Authorization: 'Bearer 264c77f740cc1f02cac8f0a7e30ccdcd2f20dcf5',
          },
        },
      )
      .then((response) => {
        localStorage.setItem('token', JSON.stringify(response.data));
        window.location.href = '/';
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getDataFromEndpoint = useCallback(async () => {
    // get token from local storage and storeg the response from request

    const token = await localStorage.getItem('token');
    axios
      .get(
        `https://api.arenaracingcompany.co.uk/event/month/1318/${activeMonth}`,

        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        },
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          getRefreshToken();
        }
      });
  }, [activeMonth]);

  useEffect(() => {
    getDataFromEndpoint();
  }, [getDataFromEndpoint]);

  return (
    <div className='App'>
      <header>
        <div>
          <h3>Calendar</h3>
        </div>
        <div>
          <p>
            Filter:
            <span>
              <select onChange={(e) => setActiveMonth(e.target.value)}>
                <option value={1}>January</option>
                <option value={2}>February</option>
                <option value={3}>March</option>
                <option value={4}>April</option>
                <option value={5}>May</option>
                <option value={6}>June</option>
                <option value={7}>July</option>
                <option value={8}>August</option>
                <option value={9}>September</option>
                <option value={10}>October</option>
                <option value={11}>November</option>
                <option value={12}>December</option>
              </select>
            </span>
          </p>
        </div>
      </header>
      <div className='contents-body'>
        {data.map((item, key) => (
          <CalendarCard
            key={key}
            title={item.title}
            date={item.date}
            description={item.description}
            image={item.images.desktop}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
