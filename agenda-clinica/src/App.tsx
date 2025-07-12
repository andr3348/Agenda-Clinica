import './App.css'
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react'
import {  createViewDay ,createViewWeek, createViewMonthGrid, type CalendarEventExternal } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/calendar.css';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createResizePlugin } from '@schedule-x/resize';
import { useEffect, useState } from 'react';
import { getCitas, type Cita } from './api/citaApi';
import EventFormModal from './components/EventFormModal.tsx';
import TimeGridEvent from './components/time-grid-event.tsx';

const customComponents = {
  timeGridEvent: TimeGridEvent,
};

function App() {
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEventExternal | null>(null);

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid()
    ],
    // Los eventos se cargarán de forma asíncrona, por lo que empezamos con un array vacío.
    events: [],
    selectedDate: new Date().toISOString().split('T')[0],
    plugins: [
      createDragAndDropPlugin(),
      createResizePlugin()
    ],
    locale: 'es-ES',
    // Define los calendarios para poder asignar colores a los eventos
    calendars: {
      confirmada: {
        colorName: 'confirmada',
        lightColors: {
          main: '#4ade80', // verde
          container: '#f0fdf4',
          onContainer: '#166534'
        },
        darkColors: {
          main: '#4ade80',
          container: '#14532d',
          onContainer: '#f0fdf4'
        }
      },
      // Puedes añadir más calendarios para otros estados
    }
    ,
    callbacks: {
      onEventClick: (event) => {
        setSelectedEvent(event);
      }
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citas: Cita[] = await getCitas();

      const newEvents: CalendarEventExternal[] = citas.map((cita) => ({
        id: cita.idCita.toString(),
        title: `${cita.paciente.nombre} - ${cita.motivo}`,
        start: cita.fechaInicio.replace('T', ' ').slice(0, 16),
        end: cita.fechaFin.replace('T', ' ').slice(0, 16),
        description: `Doctor: ${cita.doctor.nombre}\nEstado: ${cita.estado.nombreEstado}\nEncargado: ${cita.encargado ? cita.encargado.nombre : 'No asignado'}`,
        color: cita.estado.colorHex,
        calendarId: cita.idCita.toString()
      }));

      // Para depuración: verifica que los eventos se están creando correctamente
      console.log('Eventos para cargar:', newEvents);

      // El calendar.events.set() es el método correcto para actualizar los eventos.
      if (calendar) calendar.events.set(newEvents);

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
      <ScheduleXCalendar
        calendarApp={calendar}
        customComponents={customComponents}
      />

      {selectedEvent && (
        <EventFormModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  </>
)
}

export default App