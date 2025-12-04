import { StyleWrapper } from './NoticeCalendar.styled';
import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

const NoticeCalendar = () => {
    const [events, setEvents] = useState([]);
    const calendarRef = useRef();

    useEffect(() => {
    fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const { data } = await axios.get('http://localhost/notices/calendar')

        const converted = data.events.map(e => ({
        title: e.title,
        start: e.startDate,
        end: e.endDate,
        }));

        setEvents(converted);
    };

    return (
      <>
        <StyleWrapper>
          <FullCalendar
              ref={calendarRef}
              initialView="dayGridMonth"
              plugins={[dayGridPlugin, interactionPlugin]}

              events={events}

              contentHeight={'auto'}

              headerToolbar={{
              start: "title",
              center: "",
              end: "prev,next"
          }}
          />
        </StyleWrapper>
      </>
    );
};

export default NoticeCalendar;
