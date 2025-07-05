import './App.css'
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react'
import { createViewWeek, createViewMonthGrid, type CalendarEventExternal } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/calendar.css';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createResizePlugin } from '@schedule-x/resize';
import { useEffect, useState } from 'react';
import { getCitas, type Cita } from './api/citaApi';
import TimeGridEvent from './components/time-grid-event.tsx';

function App() {
  const customComponents = {
    timeGridEvent: TimeGridEvent
  };

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<CalendarEventExternal[]>([]);

  const calendar = useCalendarApp({
    views: [
      createViewWeek(),
      createViewMonthGrid()
    ],
    events: events,
    selectedDate: new Date().toISOString().split('T')[0],
    plugins: [
      createEventModalPlugin(),
      createDragAndDropPlugin(),
      createResizePlugin()
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const testEvents: CalendarEventExternal[] = [
          {
          id: 20,
          title: 'Test event',
          start: '2025-07-04 02:00',
          end: '2025-07-04 03:00',
          colorHex: '#339333'
          },
          {
          id: 25,
          title: 'Another test',
          start: '2025-07-04 05:00',
          end: '2025-07-04 05:30',
          colorHex: '#87CEEB'
        }
      ];

        const citas: Cita[] = await getCitas();

      const newEvents: CalendarEventExternal[] = citas.map((cita) => ({
        id: cita.idCita.toString(),
        title: `${cita.paciente.nombre} - ${cita.motivo}`,
        start: cita.fechaInicio.replace('T', ' ').slice(0, 16),
        end: cita.fechaFin.replace('T', ' ').slice(0, 16),
        description: `
              Doctor: ${cita.doctor.nombre}\n
              Estado: ${cita.estado.nombreEstado}\n
              Encargado: ${cita.encargado ? cita.encargado.nombre : 'No asignado'}`,
        colorHex: cita.estado.colorHex
      }));


      setEvents([...testEvents, ...newEvents]);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

useEffect(() => {
  if (calendar && events.length > 0) {
    calendar.events.set(events);
  }
}, [events, calendar]);

if (loading) return <p>Cargando agenda...</p>;

return (
  <>
    <div>
      <ScheduleXCalendar
        calendarApp={calendar}
        customComponents={customComponents}
      />
    </div>
  </>
)
}

export default App