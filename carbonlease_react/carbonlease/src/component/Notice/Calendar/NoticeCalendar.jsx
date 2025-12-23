import { StyleWrapper } from './NoticeCalendar.styled';
import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from 'react-bootstrap';
import { getCategories, getEvents } from '../../../api/notice/noticeCalendarApi';

const NoticeCalendar = () => {
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [originalEvents, setOriginalEvents] = useState([]);
    const [open, setOpen] = useState(true)

    const calendarRef = useRef();

    useEffect(() => {
      fetchEvents();
      fetchCategories();
    }, []);

    // event색상 지정
    const eventColorClass = (cat) => {
      switch (cat) {
        case 1: return 'green';
        case 2: return 'blue';
        case 3: return 'red';
        default: return 'yellow';
      }
    };


    // 카테고리 가져오기
    const fetchCategories = async () => {
      try {
        const data = await getCategories();      
        setCategories(data.categories ?? []);    
      } catch (e) {
        console.error(e);
      }
    };

    // 일정 가져오기
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        const converted = (data.events ?? []).map((e) => ({
          id: e.calendarNo,
          title: e.title,
          start: e.startDate,
          end: e.endDate,
          categoryNo: e.categoryNo,
          className: eventColorClass(e.categoryNo),
        }));

        setEvents(converted);
        setOriginalEvents(converted);
      } catch (e) {
        console.error(e);
      }
    };



    const filterByCategory = (cat) => {
      if (cat === "all") {
        setEvents(originalEvents);
        return;
      }
      setEvents(originalEvents.filter((e) => e.categoryNo === cat));
    };


    const customButtons = categories.reduce((acc, cat) => {
      acc[`category${cat.categoryNo}`] = {
        text: cat.categoryName,
        click: () => filterByCategory(cat.categoryNo),
      };
      return acc;
    }, {});

    customButtons.allButton = {
      text: "전체",
      click: () => filterByCategory("all"),
    };


    const btnList = [
      ...categories.map(c => `category${c.categoryNo}`),
      'allButton'
    ].join(',');

    

    return (
      <>
          <Button
            onClick={() => setOpen(!open)}
            style={{
              marginBottom: "10px",
              border: "none",
              padding: "8px 14px",
              background: "#4caf50",
              color: "#fff",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            {open? "달력 접기" : "달력 펼치기"}
          </Button>
        <StyleWrapper>

          {open && (
            <div style={{ transition: "0.3s" }}>

              <FullCalendar
                  ref={calendarRef}
                  initialView="dayGridMonth"
                  plugins={[dayGridPlugin, interactionPlugin]}
    
                  events={events}
    
                  headerToolbar={{
                  start: "title",
                  center: btnList,
                  end: "today prev,next"
              }}
              customButtons={customButtons}
              />
              
              </div>
            )}
            
          
        </StyleWrapper>
      </>
    );
};

export default NoticeCalendar;
