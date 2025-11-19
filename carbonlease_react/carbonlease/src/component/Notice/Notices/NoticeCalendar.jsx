import { StyleWrapper } from './NoticeCalendar.styled';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const NoticeCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    axios.get('http://localhost/api/events')
      .then((res) => {
        const converted = res.data.map(ev => ({
          title: ev.title,
          start: ev.startDate,
          end: ev.endDate,
        }));

        console.log(converted);
        setEvents(converted);
      });
  };

  return (
    <>
    <StyleWrapper>
      <FullCalendar
        initialView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={events}
        height={"auto"}
      />
    </StyleWrapper>
    </>
  );
};

export default NoticeCalendar;
