import { type CalendarEventExternal } from '@schedule-x/calendar'
import './EventFormModal.css'
import type React from 'react'
import { useEffect, useState } from 'react'
import { updateCita } from '../api/citaApi';
import { getDoctores, type Doctor } from '../api/doctorApi';
import { getEstadosCita, type EstadoCita } from '../api/estadoCitaApi';
import { getByRol, type Usuario } from '../api/usuarioApi';

type Props = {
  event: CalendarEventExternal
  onClose: () => void
  onUpdate: () => void;
};

export default function EventFormModal({ event, onClose, onUpdate }: Props) {
  // Evita que los clics dentro del modal lo cierren
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  };

  // Estado para mantener los IDs de las entidades seleccionadas.
  const [formData, setFormData] = useState({
    id: event.id,
    title: event.title,
    start: event.start, // Mantenemos el formato original 'YYYY-MM-DD HH:mm'
    end: event.end,
    doctorId: '',
    estadoId: '',
    encargadoId: ''
  });

  const changeFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Mapea los nombres del formulario a las claves de estado que almacenan los IDs
    const nameMap: { [key: string]: string } = {
      doctor: 'doctorId',
      estado: 'estadoId',
      encargado: 'encargadoId',
    };
    const stateKey = nameMap[name] || name;
    setFormData((prevData) => ({
      ...prevData,
      [stateKey]: value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Busca los objetos completos basándose en los IDs almacenados en el estado.
    const selectedDoctor = doctores.find(d => d.idDoctor === Number(formData.doctorId));
    const selectedEstado = estados.find(e => e.idEstado === Number(formData.estadoId));
    const selectedEncargado = encargados.find(u => u.idUsuario === Number(formData.encargadoId));

    // 2. Valida que todos los campos necesarios estén seleccionados.
    if (!selectedDoctor || !selectedEstado || !selectedEncargado) {
      console.error("Por favor, asegúrate de que todos los campos estén seleccionados.");
      return;
    }

    // 3. Formatea las fechas al formato esperado por la API (ISO 8601).
    const formatDateForAPI = (dateString: string) => dateString.replace(' ', 'T');

    // 4. Construye el payload y llama a la API dentro de un try/catch.
    try {
      await updateCita(formData.id.toString(), {
      fechaInicio: formatDateForAPI(formData.start),
      fechaFin: formatDateForAPI(formData.end),
      doctor: selectedDoctor,
      estado: selectedEstado,
      encargado: selectedEncargado
    });
    onUpdate();
    } catch (error) {
      console.error("Falló la actualización de la cita:", error);
    }
  }


  // FETCH DATA API
  const [doctores, setDoctores] = useState<Doctor[]>([]);
  const [estados, setEstados] = useState<EstadoCita[]>([]);
  const [encargados, setEncargados] = useState<Usuario[]>([]);

  // Efecto para establecer los IDs iniciales en el estado del formulario una vez que los datos se cargan.
  useEffect(() => {
    if (doctores.length > 0 && estados.length > 0 && encargados.length > 0) {
      setFormData(prev => ({
        ...prev,
        // Encuentra el ID correspondiente al nombre que viene del evento.
        doctorId: String(doctores.find(d => d.nombre === event.doctor)?.idDoctor || ''),
        estadoId: String(estados.find(e => e.nombreEstado === event.estado)?.idEstado || ''),
        encargadoId: String(encargados.find(u => u.nombre === event.encargado)?.idUsuario || ''),
      }));
    }
  }, [doctores, estados, encargados, event]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctores: Doctor[] = await getDoctores();
        setDoctores(doctores);

        const estados: EstadoCita[] = await getEstadosCita();
        setEstados(estados);

        const encargados: Usuario[] = await getByRol("Recepcionista");
        setEncargados(encargados);

      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

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
          <form action="" onSubmit={handleSubmit} >
            <div>
              <label htmlFor="start">Inicio:</label>
              <input type="text" name="start" id="start" value={formData.start} onChange={changeFormData} />
            </div>
            <div>
              <label htmlFor="end">Fin:</label>
              <input type="text" name="end" id="end" value={formData.end} onChange={changeFormData} />
            </div>

            <div>
              <label htmlFor="doctor">Doctor:</label>
              <select name="doctor" id="doctor" value={formData.doctorId} onChange={changeFormData}>
                <option value="">Seleccione un doctor</option>
                {
                  doctores.map(doctor => (
                    <option value={doctor.idDoctor} key={doctor.idDoctor}>{doctor.nombre}</option>
                  ))
                }
              </select>
            </div>

            <div>
              <label htmlFor="encargado">Encargado:</label>
              <select name="encargado" id="encargado" value={formData.encargadoId} onChange={changeFormData}>
                <option value="">Seleccione un encargado</option>
                {
                  encargados.map(encargado => (
                    <option value={encargado.idUsuario} key={encargado.idUsuario}>{encargado.nombre}</option>
                  ))
                }
              </select>
            </div>

            <div>
              <label htmlFor="estado">Estado:</label>
              <select name="estado" id="estado" value={formData.estadoId} onChange={changeFormData}>
                <option value="">Seleccione un estado</option>
                {
                  estados.map(estado => (
                    <option value={estado.idEstado} key={estado.idEstado}>{estado.nombreEstado}</option>
                  ))
                }
              </select>
            </div>

            <div>
              <button onClick={onClose}>Cerrar</button>
              <button type='submit'>Guardar</button>
            </div>
          </form>
        </div>
      </div >
    </div >
  )
}