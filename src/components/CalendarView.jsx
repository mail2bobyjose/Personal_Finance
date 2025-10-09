import React, { useState } from "react";
import dayjs from "dayjs";
import { today } from "react-big-calendar/lib/utils/dates";

const hours = Array.from({ length: 24 }, (_, i) => i); // 12AM - 12PM

const meetings = [
  { id: 1, title: "Math - Grade 8", start: "2025-10-03T09:15:00", end: "2025-10-03T10:15:00", state: "scheduled" },
  { id: 2, title: "Physics - Grade 10", start: "2025-10-03T09:30:00", end: "2025-10-03T10:00:00",state: "proposed" },
  { id: 3, title: "English - Grade 6", start: "2025-10-03T09:45:00", end: "2025-10-03T10:45:00",state: "cancelled"  },
  { id: 4, title: "Chemistry - Grade 11", start: "2025-10-04T03:00:00", end: "2025-10-04T04:00:00",state: "scheduled" },
  { id: 5, title: "Biology - Grade 11", start: "2025-10-04T03:00:00", end: "2025-10-04T04:00:00",state: "scheduled" },
  { id: 6, title: "Art - Grade 11", start: "2025-10-04T03:00:00", end: "2025-10-04T04:00:00",state: "scheduled" },
];


export default function DailyCalendar() {
  const [currentDate, setCurrentDate] = useState(dayjs(new Date()));

  const filteredMeetings = meetings
    .filter((m) => dayjs(m.start).isSame(currentDate, "day"))
    .sort((a, b) => dayjs(a.start).diff(dayjs(b.start)));


  const goPrevDay = () => setCurrentDate(currentDate.subtract(1, "day"));
  const goNextDay = () => setCurrentDate(currentDate.add(1, "day"));
  const formatTime = (date) => dayjs(date).format("h:mm A");

  // ✅ Assign non-overlapping columns
  const processedMeetings = [];
  filteredMeetings.forEach((meeting) => {
    const start = dayjs(meeting.start);
    const end = dayjs(meeting.end);
    let column = 0;

    while (
      processedMeetings.some(
        (m) =>
          m.column === column &&
          start.isBefore(dayjs(m.end)) &&
          end.isAfter(dayjs(m.start))
      )
    ) {
      column++;
    }

    processedMeetings.push({ ...meeting, column, start, end });
  });

  const maxColumns = processedMeetings.length
    ? Math.max(...processedMeetings.map((m) => m.column)) + 1
    : 1;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button style={styles.button} onClick={goPrevDay}>
          ⬅ Previous
        </button>
        <div>
                    <div style={{ fontSize: "18px", color: "#555" }}>
            {currentDate.format("MMMM D, YYYY")}
          </div>
        </div>
        <button style={styles.button} onClick={goNextDay}>
          Next ➡
        </button>
      </div>

      <div style={styles.calendarContainer}>
        <div style={styles.calendarGrid}>
          {/* Horizontal Lines */}
          {hours.map((hour) => (
            <div key={`hour-${hour}`} style={{ ...styles.hourLine, top: `${hour * 64}px` }} />
          ))}
          {hours.map((hour) =>
            [15, 30, 45].map((minute, idx) => (
              <div
                key={`${hour}-q-${idx}`}
                style={{
                  ...styles.quarterLine,
                  top: `${hour * 64 + (minute / 15) * 16}px`,
                }}
              />
            ))
          )}

          {/* Time Labels */}
          {hours.map((hour) => (
            <div
              key={`label-${hour}`}
              style={{
                ...styles.timeLabel,
                top: `${hour * 64 - 10}px`,
              }}
            >
              {hour === 0
                ? "12 AM"
                : hour < 12
                ? `${hour} AM`
                : hour === 12
                ? "12 PM"
                : `${hour - 12} PM`}
            </div>
          ))}

          {/* Vertical Separator */}
          <div style={styles.separator}></div>

          {/* Meeting Blocks */}
          {processedMeetings.map((meeting) => {
            const startHour = meeting.start.hour();
            const startMinute = meeting.start.minute();
            const duration = meeting.end.diff(meeting.start, "minute");

            const top = startHour * 64 + (startMinute / 15) * 16;
            const height = (duration / 15) * 12;
            const blockWidth = 600 / maxColumns;

            return (
              <div
                key={meeting.id}
                style={{
                  ...styles.meetingBlock,
                  top: `${top}px`,
                  height: `${height}px`,
                  left: `${60 + meeting.column * blockWidth}px`,
                  width: `${blockWidth - 10}px`,
                }}
              >
                <div style={styles.meetingTitle}>{meeting.title}</div>
                <div style={styles.meetingTime}>
                  {`${formatTime(meeting.start)} - ${formatTime(meeting.end)}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Segoe UI, sans-serif",
    background: "#f4f6fa",
    padding: "30px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  button: {
    background: "#4e73df",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
  },
  calendarContainer: {
    border: "3px solid #1d1c1cff",
    background: "#fff",
    borderRadius: "12px",
    width: "auto",
    margin: "0 auto",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    position: "relative",
    top: "10px" 

  },
  calendarGrid: {
    position: "relative",
    height: `${24 * 64}px`,
    top: "20px",
    bottom: "20px"
  },
  hourLine: {
    position: "absolute",
    left: 0,
    right: 0,
    borderTop: "2px solid #d0d0d0",
    zIndex: 0,
  },
  quarterLine: {
    position: "absolute",
    left: 0,
    right: 0,
    borderTop: "1px dashed #d9d9d9",
    zIndex: 0,
  },
  timeLabel: {
    position: "absolute",
    left: "10px",
    width: "80px",
    textAlign: "left",
    fontSize: "13px",
    color: "#555",
    zIndex: 2,
  },
  separator: {
    position: "absolute",
    left: "50px",
    top: 0,
    bottom: 0,
    width: "1px",
    background: "#c0c0c0",
    zIndex: 1,
  },
  meetingBlock: {
    position: "absolute",
    background: "#4e73df",
    color: "#fff",
    borderRadius: "10px",
    padding: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    zIndex: 2,
    
  },
  meetingTitle: {
    fontWeight: "600",
    fontSize: "14px",
  },
  meetingTime: {
    fontSize: "12px",
    opacity: 0.9,
  },
};
