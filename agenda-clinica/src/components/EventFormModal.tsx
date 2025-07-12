import { type CalendarEventExternal } from '@schedule-x/calendar'
import './EventFormModal.css' // Reutilizamos los mismos estilos

type Props = {
  event: CalendarEventExternal
  onClose: () => void
}

export default function EventFormModal({ event, onClose }: Props) {
  // Evita que los clics dentro del modal lo cierren
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    // El overlay (fondo oscuro) cierra el modal al hacer clic
    <div className="custom-modal__overlay" onClick={onClose}>
      <div className="custom-modal__content" onClick={handleContentClick}>
        <div className="custom-modal__header">
          <h2>{event.title}</h2>
          <button onClick={onClose} className="custom-modal__close-btn">
            &times;
          </button>
        </div>
        <div className="custom-modal__body">
          <p>
            <strong>Inicio:</strong> {new Date(event.start).toLocaleString()}
          </p>
          <p>
            <strong>Fin:</strong> {new Date(event.end).toLocaleString()}
          </p>
          <p>
            <strong>Descripción:</strong>
          </p>
          <pre>{event.description}</pre>
        </div>
        <div className="custom-modal__footer">
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}