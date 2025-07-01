import './App.css'
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react'
import { createViewWeek, createViewMonthGrid } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/calendar.css';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createResizePlugin } from '@schedule-x/resize';

function App() {

  const calendar = useCalendarApp({
    views: [
      createViewWeek(),
      createViewMonthGrid()
    ],
    events: [
      {
        id: 1,
        title: "New event",
        start: '2025-01-01 00:00',
        end: '2025-01-01 02:00',
        description: 'Cool description'
      }
    ],
    selectedDate: '2025-01-15',
    plugins: [
      createEventModalPlugin(),
      createDragAndDropPlugin(),
      createResizePlugin()
    ]

  });

  return (
    <>
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
    </>
  )
}

export default App
