import './App.css'
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react'
import { createViewDay, createViewWeek, type CalendarEventExternal } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/calendar.css';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createResizePlugin } from '@schedule-x/resize';
import { useEffect, useState } from 'react';
import { getCitas, type Cita } from './api/citaApi';
import EventFormModal from './components/EventFormModal.tsx';
import TimeGridEvent from './components/time-grid-event.tsx';
import { BtnActionsMenu } from './components/ui/buttons/BtnActionsMenu.tsx';

const customComponents = {
  timeGridEvent: TimeGridEvent,
};

function App() {
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEventExternal | null>(null);

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek()
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
      },
      onClickDateTime: (dateTime) => {
        // dateTime tiene el formato 'YYYY-MM-DDTHH:mm:ss.sssZ'
        // Lo formateamos al formato que usa el calendario ('YYYY-MM-DD HH:mm')
        const start = dateTime.replace('T', ' ').slice(0, 16);

        // Creamos una fecha de fin por defecto (ej. 30 minutos después)
        const end = new Date(new Date(dateTime).getTime() + 30 * 60 * 1000)
          .toISOString()
          .replace('T', ' ')
          .slice(0, 16);

        // Creamos un objeto de evento "borrador" para el modal
        // Usamos un ID especial como 'new' para identificar que es un evento nuevo.
        const newEvent: CalendarEventExternal = { id: 'new', start, end, title: '' };
        setSelectedEvent(newEvent);
      }
    }
  });

  const fetchData = async () => {
    try {
      const citas: Cita[] = await getCitas();

      const newEvents: CalendarEventExternal[] = citas.map((cita) => ({
        id: cita.idCita.toString(),
        title: `${cita.paciente.nombre} - ${cita.motivo}`,
        start: cita.fechaInicio.replace('T', ' ').slice(0, 16),
        end: cita.fechaFin.replace('T', ' ').slice(0, 16),
        doctor: cita.doctor.nombre,
        estado: cita.estado.nombreEstado,
        encargado: cita.encargado ? cita.encargado.nombre : 'No asignado',
        description: `Doctor: ${cita.doctor.nombre}\nEstado: ${cita.estado.nombreEstado}\nEncargado: ${cita.encargado ? cita.encargado.nombre : 'No asignado'}`,
        color: cita.estado.colorHex,
        calendarId: cita.idCita.toString()
      }));

      if (calendar) calendar.events.set(newEvents);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [calendar]);

  // Esta función se ejecutará cuando el modal confirme una actualización.
  const handleEventUpdate = () => {
    setSelectedEvent(null); // Cierra el modal
    fetchData(); // Vuelve a cargar los datos
  };

  if (loading) return <p>Cargando agenda...</p>;

  return (
    <>
      <div className='flex flex-row justify-center items-center gap-4'>
        <ScheduleXCalendar
          calendarApp={calendar}
          customComponents={customComponents}
        />

        {selectedEvent && (
          <EventFormModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onUpdate={handleEventUpdate}
          />
        )}

        <div className='self-start'>
          <BtnActionsMenu />
        </div>
      </div>
    </>
  )
}

export default App