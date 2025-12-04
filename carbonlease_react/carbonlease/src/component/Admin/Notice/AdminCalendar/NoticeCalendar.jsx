import { StyleWrapper } from './NoticeCalendar.styled';
import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

import CalendarModal from "./CalendarModal";
import { AuthContext } from '../../../Context/AuthContext';

const NoticeCalendar = () => {
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);   
  const calendarRef = useRef();
  const { auth } = useContext(AuthContext);



  useEffect(() => {
    fetchEvents();
    console.log(events)
  }, []);

  const fetchEvents = async () => {
    const { data } = await axios.get("http://localhost/admin/calendar", {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        },
    })

    const converted = data.events.map(e => ({
      title: e.title,
      start: e.start,
      end: e.end,
    }));

    setEvents(converted);
  };

  const handleSubmitEvent = (form) => {
    const newEvent = {
      title: form.title,
      start: form.start,
      end: form.end,
      allDay: true,
    };

    // 본인 페이지에서 추가
    const calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent(newEvent);

    // 요청
    axios.post('http://localhost/admin/calendar', newEvent, {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        },
    })
    .then((res) => {
      console.log(res);
      console.log(events)
    })
    .catch((err) => {
            console.error(err);
            alert("등록 실패");
    });

  };

  

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
              click: () => setOpenModal(true)   
            }
          }}
        />
      </StyleWrapper>

      <CalendarModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmitEvent}
      />
    </>
  );
};

export default NoticeCalendar;
