import './App.css'
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react'
import { createViewWeek, createViewMonthGrid, type CalendarEventExternal } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/calendar.css';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createResizePlugin } from '@schedule-x/resize';
import { useEffect, useState } from 'react';
import { getCitas, type Cita } from './api/citaApi';

function App() {
  const [loading, setLoading] = useState(true);

  const calendar = useCalendarApp({
    views: [
      createViewWeek(),
      createViewMonthGrid()
    ],
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
        const citas: Cita[] = await getCitas();

        citas.forEach((cita) => {
          const event: CalendarEventExternal = {
            id: cita.idCita.toString(),
            title: `${cita.paciente.nombre} - ${cita.motivo}`,
            start: cita.fechaInicio,
            end: cita.fechaFin,
            description: `
                Doctor: ${cita.doctor.nombre}\n
                Estado: ${cita.estado.nombreEstado}\n
                Encargado: ${cita.encargado ? cita.encargado.nombre : 'No asignado'}`,
            backgroundColor: 'Green'
          };

          if (calendar) {
            calendar?.events.add(event);
            //calendar.setTheme('dark');
          }
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [calendar]);

  if (loading) return <p>Cargando agenda...</p>;

  return (
    <>
      <div>
        <ScheduleXCalendar calendarApp={calendar} />
      </div>

    </>
  )
}

export default App
