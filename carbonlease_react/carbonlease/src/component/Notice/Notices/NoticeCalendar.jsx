import { StyleWrapper } from './NoticeCalendar.styled';
import { Modal } from 'react-bootstrap';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { useRef } from 'react';

const NoticeCalendar = () => {
  const [events, setEvents] = useState([]);
  const calendarRef = useRef();

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

const handleAddEvent = () => {

    const dateStr = prompt('날짜를 YYYY-MM-DD 형식으로 입력하세요');
    const date = new Date(`${dateStr}T00:00:00`);

    if (isNaN(date.valueOf())) {
      alert("날짜 형식이 잘못되었습니다.");
      return;
    }

    const newEvent = {
      title: 'dynamic event',
      start: dateStr,
      allDay: true,
    };

    const calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent(newEvent);

}


  return (
    <>
    <StyleWrapper>
      <FullCalendar
        ref={calendarRef}
        initialView="dayGridMonth"
        plugins={[dayGridPlugin, interactionPlugin]}

        events={events}

        height={500}
        contentHeight={"auto"}

        headerToolbar={{
          start: "title",
          center: "",
          end: "addEventBtn prev,next"
        }}

        customButtons={{
          addEventBtn: {
            text: "일정 등록",
            click: handleAddEvent
          }
        }}
        
      />
    </StyleWrapper>
    </>
  );
};

export default NoticeCalendar;
