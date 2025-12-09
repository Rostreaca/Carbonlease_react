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
  const [openEditModal, setOpenEditModal] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const calendarRef = useRef();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth?.accessToken) return;
    fetchEvents();
  }, [auth]);

  // 일정 전체 조회
  const fetchEvents = async () => {

    const { data } = await axios.get("http://localhost/admin/calendar", {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      }
    });

    const converted = data.events.map(e => ({
      id: e.calendarNo,
      title: e.title,
      start: e.start,
      end: e.end,
      categoryNo: e.categoryNo,
      className: eventColorClass(e.categoryNo)
    }));

    setEvents(converted);
  };


  // 일정 등록
  const handleSubmitEvent = (form) => {

    const newEvent = {
      title: form.title,
      start: form.start,
      end: form.end,
      categoryNo: form.categoryNo,
      allDay: true
    };

    axios.post("http://localhost/admin/calendar", newEvent, {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    }).then((res) => {

      const createdEvent = {
        id: res.data.calendarNo,
        ...newEvent
      };

      calendarRef.current.getApi().addEvent(createdEvent);

      setOpenModal(false);

    }).catch(() => {
      alert("등록 실패");
    });
  };


  // 일정 클릭
const handleEventClick = (info) => {
  const event = info.event;

  setSelectedEvent({
    calendarNo: event.id,
    title: event.title,
    start: event.startStr,
    end: event.endStr,
    categoryNo: event.extendedProps.categoryNo,
  });

  setOpenEditModal(true);
};



  // 일정 수정
  const handleUpdateEvent = async (form) => {

    const updated = {
      calendarNo: selectedEvent.calendarNo,
      title: form.title,
      start: form.start,
      end: form.end,
      categoryNo: form.categoryNo,
      allDay: true
    };

    await axios.put(
      `http://localhost/admin/calendar/${selectedEvent.calendarNo}`,
      updated,
      { headers: { Authorization: `Bearer ${auth.accessToken}` } }
    );

    const calendarApi = calendarRef.current.getApi();
    const cur = calendarApi.getEventById(selectedEvent.calendarNo);

    cur.setProp("title", updated.title);
    cur.setDates(updated.start, updated.end);
    cur.setExtendedProp("categoryNo", updated.categoryNo);
    cur.setProp("className", eventColorClass(updated.categoryNo));


    setOpenEditModal(false);
  };


  // 일정 삭제
  const handleDeleteEvent = async () => {

    await axios.delete(
      `http://localhost/admin/calendar/${selectedEvent.calendarNo}`,
      { headers: { Authorization: `Bearer ${auth.accessToken}` } }
    );

    const calendarApi = calendarRef.current.getApi();
    const event = calendarApi.getEventById(selectedEvent.calendarNo);
    event.remove();

    setOpenEditModal(false);
  };

  // event색상 지정
  const eventColorClass = (cat) => {
    switch (cat) {
      case 1: return 'green';
      case 2: return 'blue';
      case 3: return 'red';
      default: return 'yellow';
    }
  };
  
  return (
    <>
      <StyleWrapper>
        <FullCalendar
          ref={calendarRef}
          initialView="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin]}

          events={events}
          eventClick={handleEventClick}
          height={550}

          headerToolbar={{
            start: "title",
            end: "addEvent prev,next"
          }}

          customButtons={{
            addEvent: {
              text: "일정 등록",
              click: () => setOpenModal(true)
            }
          }}
        />
      </StyleWrapper>


      {/* 등록 모달 */}
      <CalendarModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmitEvent}
        isEdit={false}
      />

      {/* 수정 모달 */}
      <CalendarModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onSubmit={handleUpdateEvent}
        onDelete={handleDeleteEvent}
        event={selectedEvent}
        isEdit={true}
      />

    </>
  );
};

export default NoticeCalendar;
