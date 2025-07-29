import React, { useEffect, useState } from 'react'
import { getDoctores, type Doctor } from '../../../api/doctorApi';

type Props = {
  selectedDoctorId: string;
  onDoctorChange: (id: string) => void;
}

export const BtnFilter = ({ selectedDoctorId, onDoctorChange }: Props) => {
  const [filtersToggle, setFiltersToggle] = useState(false);

  const handleClick = () => {
    setFiltersToggle(!filtersToggle);
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onDoctorChange(e.target.value);
  }

  const [doctores, setDoctores] = useState<Doctor[]>();

  const fetchData = async () => {
    const doctores = await getDoctores();
    setDoctores(doctores);
  }

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.error("Error al obtener los doctores:", error);
    }
  }, [])

  return (
    <>
      <div className='flex flex-col gap-3'>
        <button type='button' onClick={handleClick}
        className='flex justify-center items-center p-4
        bg-[#fff] border-[1px] border-[#999] rounded-full
        cursor-pointer hover:bg-[hsl(0,0%,98%)]
        transition-all duration-200 w-16 self-end'>
          <img src="/src/assets/filter_black.png" alt="Filter" 
          className='opacity-30 aspect-auto'/>
        </button>

        {
          filtersToggle && (
            <div>
              <select name="doctor" id="doctor" value={selectedDoctorId} onChange={handleChange} className='border-[1px] 
              border-[hsl(0,0%,80%)] rounded-[8px] bg-[hsl(0,0%,98%)]
              p-2 text-[.9rem]'>
                <option value="">
                  Seleccione un doctor
                </option>
                {
                  doctores?.map(doctor => (
                    <option value={doctor.idDoctor} key={doctor.idDoctor}>{doctor.nombre}</option>
                  ))
                }
              </select>
            </div>
          )
        }
      </div>
    </>
  )
}
