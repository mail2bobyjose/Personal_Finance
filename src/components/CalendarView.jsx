// src/components/CalendarView.jsx
import React, { useMemo, useState, useCallback } from 'react';
import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { 'en-US': enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const initialEvents = [
  {
    id: 1,
    subject: 'Math - Algebra',
    studentName: 'Alice Johnson',
    teacherName: 'Mr. Smith',
    start: (() => { const d = new Date(); d.setHours(19, 0, 0, 0); return d; })(),
    end: (() => { const d = new Date(); d.setHours(20, 0, 0, 0); return d; })(),
  },
];

const CustomToolbar = (toolbar) => {
  const label = useMemo(() => format(toolbar.date, 'EEEE, MMM d, yyyy'), [toolbar.date]);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button" onClick={() => toolbar.onNavigate('PREV')} className="menu-item">◀</button>
        <button type="button" onClick={() => toolbar.onNavigate('TODAY')} className="menu-item">Today</button>
        <button type="button" onClick={() => toolbar.onNavigate('NEXT')} className="menu-item">▶</button>
      </div>
      <div style={{ fontWeight: 'bold' }}>{label}</div>
    </div>
  );
};

const CalendarView = () => {
  const [events, setEvents] = useState(initialEvents);
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const handleNavigate = useCallback((newDate) => {
    setCurrentDate(newDate);
  }, []);

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={Views.DAY}
        views={[Views.DAY]}
        date={currentDate}
        onNavigate={handleNavigate}
        step={60}
        timeslots={1}
        components={{
          toolbar: CustomToolbar,
          event: ({ event }) => (
            <div style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              ({event.studentName} - {event.subject} - {event.teacherName})
            </div>
          ),
        }}
        eventPropGetter={() => ({
          style: {
            whiteSpace: 'nowrap',
            width: '100px',
            right: 'auto',
            maxWidth: '100%',
            backgroundColor: '#f3f4f6',
            border: '1px solid #e5e7eb',
            boxShadow: 'none',
            padding: '2px 6px',
            borderRadius: '6px',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            color: '#000000',
          },
          className: 'compact-event',
        })}
        style={{ height: 'calc(100vh - 140px)' }}
      />
    </div>
  );
};

export default CalendarView;


