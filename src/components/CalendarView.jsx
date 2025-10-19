import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

const hours = Array.from({ length: 24 }, (_, i) => i); // 12AM - 12PM

const meetings = [
  {
    meetingID: 1,
    date: "2025-10-19",
    startTime: "09:15",
    endTime: "10:15",
    studentName: "John Doe",
    subject: "Math",
    teacherName: "Smith",
    meetingType: "Demo",
    meetingStatus: "Cancelled",
  },
  {
    meetingID: 2,
    date: "2025-10-03",
    startTime: "09:30",
    endTime: "10:00",
    studentName: "Jane",
    subject: "Physics",
    teacherName: "Brown",
    meetingType: "Demo",
    meetingStatus: "Proposed",
  },
  {
    meetingID: 3,
    date: "2025-10-19",
    startTime: "09:45",
    endTime: "10:45",
    studentName: "Alice Johnson",
    subject: "English",
    teacherName: "Lee",
    meetingType: "Regular",
    meetingStatus: "Proposed",
  },
  {
    meetingID: 4,
    date: "2025-10-19",
    startTime: "22:00",
    endTime: "23:00",
    studentName: "Bob Smith",
    subject: "Chemistry",
    teacherName: "Green",
    meetingType: "Adhoc",
    meetingStatus: "Scheduled",
  },
  {
    meetingID: 5,
    date: "2025-10-19",
    startTime: "03:00",
    endTime: "04:00",
    studentName: "Carol White",
    subject: "Biology",
    teacherName: "Green",
    meetingType: "Regular",
    meetingStatus: "Completed",
  },
  {
    meetingID: 6,
    date: "2025-10-19",
    startTime: "03:00",
    endTime: "04:00",
    studentName: "Dave Black",
    subject: "Grade 11",
    teacherName: "Brown",
    meetingType: "Demo",
    meetingStatus: "Scheduled",
  },
];

export default function DailyCalendar() {
  const [currentDate, setCurrentDate] = useState(dayjs(new Date()));
  const [currentTimeTop, setCurrentTimeTop] = useState(null);

  const meetingsWithDateTime = meetings.map((m) => ({
    ...m,
    start: dayjs(`${m.date}T${m.startTime}`),
    end: dayjs(`${m.date}T${m.endTime}`),
  }));

  const filteredMeetings = meetingsWithDateTime
    .filter((m) => m.start.isSame(currentDate, "day"))
    .sort((a, b) => a.start.diff(b.start));

  const goPrevDay = () => setCurrentDate(currentDate.subtract(1, "day"));
  const goNextDay = () => setCurrentDate(currentDate.add(1, "day"));
  const formatTime = (date) => dayjs(date).format("h:mm A");

  // Position current time line based on current time, update every minute
  useEffect(() => {
    const calculateCurrentTimeTop = () => {
      const now = dayjs();
      if (!now.isSame(currentDate, "day")) {
        setCurrentTimeTop(null);
        return;
      }
      const hour = now.hour();
      const minute = now.minute();
      // 64px per hour, 16px per quarter hour segment, so 1px = 64/60 = 1.0666...
      const topPos = hour * 64 + (minute / 60) * 64;
      setCurrentTimeTop(topPos);
    };

    calculateCurrentTimeTop();

    const interval = setInterval(calculateCurrentTimeTop, 60000);
    return () => clearInterval(interval);
  }, [currentDate]);

  const processedMeetings = [];
  filteredMeetings.forEach((meeting) => {
    const start = meeting.start;
    const end = meeting.end;
    let column = 0;

    while (
      processedMeetings.some(
        (m) =>
          m.column === column &&
          start.isBefore(m.end) &&
          end.isAfter(m.start)
      )
    ) {
      column++;
    }

    processedMeetings.push({ ...meeting, column, start, end });
  });

  const maxColumns = processedMeetings.length
    ? Math.max(...processedMeetings.map((m) => m.column)) + 1
    : 1;

  const columnGap = 20;
  const totalWidth = 600;
  const blockWidth = (totalWidth - (maxColumns - 1) * columnGap) / maxColumns;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "proposed":
        return "hsla(54, 100%, 83%, 1.00)"; // light blue
      case "scheduled":
        return "#a8ffa8"; // light green
      case "completed":
        return "#4caf50"; // darker green
      case "cancelled":
      case "canceled":
        return "#ff6b6b"; // red
      default:
        return "#7e828bff"; // default gray
    }
  };

  // Abbreviate meeting type and background color for the small type badge
  const getMeetingTypeAbbr = (type) => {
    switch (type.toLowerCase()) {
      case "regular":
        return { abbr: "REG", bg: "#333" };
      case "demo":
        return { abbr: "DEMO", bg: "#555" };
      case "adhoc":
        return { abbr: "ADHOC", bg: "#777" };
      default:
        return { abbr: type.toUpperCase().slice(0, 3), bg: "#555" };
    }
  };

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
            <div
              key={`hour-${hour}`}
              style={{ ...styles.hourLine, top: `${hour * 64}px` }}
            />
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

          {/* Current Time Line */}
          {currentTimeTop !== null && (
            <div
              style={{
                ...styles.currentTimeLine,
                top: currentTimeTop,
              }}
            />
          )}

          {/* Meeting Blocks */}
          {processedMeetings.map((meeting) => {
            const startHour = meeting.start.hour();
            const startMinute = meeting.start.minute();
            const duration = meeting.end.diff(meeting.start, "minute");

            const top = startHour * 64 + (startMinute / 15) * 16;
            const height = (duration / 15) * 16;

            const statusColor = getStatusColor(meeting.meetingStatus);
            const { abbr, bg } = getMeetingTypeAbbr(meeting.meetingType);

            return (
              <div
                key={meeting.meetingID}
                style={{
                  ...styles.meetingBlock,
                  top: `${top}px`,
                  height: `${height}px`,
                  left: `${60 + meeting.column * (blockWidth + columnGap)}px`,
                  width: `${blockWidth}px`,
                  backgroundColor: "#7e828bff", // neutral background
                  display: "flex",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  position: "absolute",
                  color: "white",
                }}
              >
                {/* Left color strip */}
                <div
                  style={{
                    width: "8px",
                    backgroundColor: statusColor,
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                  }}
                />
                {/* Meeting Content */}
                <div
                  style={{
                    padding: "8px",
                    flex: 1,
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    color: "white",
                    overflow: "hidden",
                  }}
                >
                  <div style={styles.meetingTitle}>
                    {meeting.studentName} --&gt; {meeting.subject} &lt;--{" "}
                    {meeting.teacherName}
                  </div>
                  <div style={styles.meetingDetails}>
                    <div>
                      {formatTime(meeting.start)} - {formatTime(meeting.end)}
                    </div>
                    <div>Status: {meeting.meetingStatus}</div>
                  </div>

                  {/* Meeting Type Badge at bottom right */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "5px",
                      right: "5px",
                      backgroundColor: bg,
                      color: "#fff",
                      padding: "2px 6px",
                      fontSize: "10px",
                      fontWeight: "bold",
                      borderRadius: "4px",
                      userSelect: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {abbr}
                  </div>
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
    top: "10px",
  },
  calendarGrid: {
    position: "relative",
    height: `${24 * 64}px`,
    top: "20px",
    bottom: "20px",
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
    color: "#fff",
    borderRadius: "10px",
    padding: "0px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    zIndex: 2,
    overflow: "hidden",
  },
  meetingTitle: {
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "4px",
  },
  meetingDetails: {
    fontSize: "12px",
    lineHeight: "1.2",
    opacity: 0.9,
  },
  currentTimeLine: {
    position: "absolute",
    left: "50px",
    right: "0",
    borderTop: "2px solid red",
    zIndex: 10,
  },
};
