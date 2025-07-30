import React, { useState } from "react"
import { saveDoctor } from "../../../api/doctorApi";
import { EliminarDoctorForm } from "./EliminarDoctorForm";

type Props = {
  onClose: () => void
}
export const DoctorFormModal = ({ onClose }: Props) => {
  const [formData, setFormData] = useState({
    nombre: '',
    especialidad: '',
  });
  const changeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const [successMessage, setSuccessMessage] = useState(false);

  const [eliminarDoctorForm, setEliminarDoctorForm] = useState(false);
      const toggleEliminarForm = () => {
          setEliminarDoctorForm(!eliminarDoctorForm);
      }

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      nombre: formData.nombre,
      especialidad: formData.especialidad,
    }

    try {
      if (!payload.nombre || !payload.especialidad) {
        console.error("Por favor, asegúrate de que todos los campos estén completados.");
        return;
      }

      await saveDoctor(payload);
      setSuccessMessage(true);
    } catch (error) {
      console.error("Falló la creación del doctor:", error);
    }
  }

  return (
    <div className='bg-[hsla(0,0%,0%,0.6)] h-screen w-screen
        absolute top-0 left-0 flex justify-center items-center z-[1000]'>
      <div className='flex flex-col gap-4 bg-[hsl(0,0%,100%)] p-4 px-6
            rounded-[8px] w-sm'>
        <div className='flex flex-row w-full justify-between items-center'>
          <h3 className='font-semibold'>Nuevo(a) Doctor(a)</h3>
          <button type='button' onClick={onClose}
            className='font-bold text-2xl text-[hsl(0,0%,60%)]
                    hover:text-[hsl(0,0%,50%)] cursor-pointer'>
            &times;
          </button>
        </div>
        <hr className='border-[hsl(0,0%,90%)]' />

        <form action="" onSubmit={handleSubmit}
          className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="nombre"
              className='font-semibold text-[.8rem] text-[hsl(0,0%,40%))]'>
              Nombre:
            </label>
            <input type="text" name="nombre" id="nombre" required
              value={formData.nombre} onChange={changeFormData}
              className='bg-[hsl(0,0%,98%)] p-3 border-[1px] 
                        border-[hsl(0,0%,80%)] rounded-[8px]' />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="especialidad"
              className='font-semibold text-[.8rem] text-[hsl(0,0%,40%))]'>
              Especialidad:
            </label>
            <input type="text" name="especialidad" id="especialidad" required
              value={formData.especialidad} onChange={changeFormData}
              className='bg-[hsl(0,0%,98%)] p-3 border-[1px] 
                        border-[hsl(0,0%,80%)] rounded-[8px]' />
          </div>
          {
            successMessage && (
              <div className='bg-[hsl(130,60%,70%)] p-2 w-fit rounded-[8px]
                            border-[1px] border-[hsl(130,60%,40%)] self-center'>
                <p className='font-semibold text-[.9rem] text-[hsl(0,0%,20%))]'>
                  Doctor(a) creado(a) con éxito.
                </p>
              </div>
            )
          }

          <hr className='border-[hsl(0,0%,90%)]' />
          <div className='flex flex-col gap-3'>
            <div className='flex flex-row gap-3'>
              <button type='button' onClick={onClose}
                className='bg-[hsl(0,0%,90%)] p-3 border-[1px] 
                        border-[hsl(0,0%,80%)] rounded-[8px] cursor-pointer
                        hover:bg-[hsl(0,0%,87%)] text-[hsl(0,0%,25%))] flex-1/2
                        font-semibold text-[.9rem] transition-all duration-200' >
                Cancelar
              </button>
              <button type='button' onClick={toggleEliminarForm}
                className='bg-[hsl(0,0%,90%)] p-3 border-[1px] 
                        border-[hsl(0,0%,80%)] rounded-[8px] cursor-pointer
                        hover:bg-[hsl(0,0%,87%)] text-[hsl(0,0%,25%))] flex-1/2
                        font-semibold text-[.9rem] transition-all duration-200' >
                Eliminar Doctor
              </button>
            </div>
            <button type='submit'
              className='bg-[hsl(220,70%,52%)] p-3 border-[1px]
                        border-[hsl(0,0%,80%)] rounded-[8px] cursor-pointer
                        hover:bg-[hsl(220,70%,47%)] text-[#fff]
                        font-semibold text-[.9rem] transition-all duration-200' >
              Crear
            </button>
          </div>
        </form>
        {
          eliminarDoctorForm && (
            <EliminarDoctorForm onClose={toggleEliminarForm} />
          )
        }
      </div>
    </div>
  )
}
