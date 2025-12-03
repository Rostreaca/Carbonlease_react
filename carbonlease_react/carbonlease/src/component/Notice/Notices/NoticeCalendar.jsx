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
  const { data } = await axios.get('http://localhost/notices/api');

  const converted = data.events.map(ev => ({
    title: ev.title,
    start: ev.startDate,
    end: ev.endDate,
  }));

  console.log(converted);
  setEvents(converted);
};


  return (
    <>
    <StyleWrapper>
      <FullCalendar
        initialView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={events}
        height={400}
        contentHeight={"auto"}

      />
    </StyleWrapper>
    </>
  );
};

export default NoticeCalendar;
