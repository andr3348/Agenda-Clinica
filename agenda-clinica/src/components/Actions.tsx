import type React from "react"
import { useState } from "react";
import { DoctorFormModal } from "./ui/forms/DoctorFormModal";
import { PacienteFormModal } from "./ui/forms/PacienteFormModal";
import { EncargadoFormModal } from "./ui/forms/EncargadoFormModal";


export const Actions = () => {
    const [form, setForm] = useState({
        doctor: false,
        paciente: false,
        encargado: false,
    });

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget;

        switch (target.name) {
            case 'doctor' :
                setForm({
                    doctor: !form.doctor,
                    paciente: false,
                    encargado: false,
                });
                break;
            case 'paciente' :
                setForm({
                    doctor: false,
                    paciente: !form.paciente,
                    encargado: false,
                });
                break;
            case 'encargado' :
                setForm({
                    doctor: false,
                    paciente: false,
                    encargado: !form.encargado,
                });
                break;
            default:
                break;
        }
    }

    const formClose = () => {
        setForm({
            doctor: false,
            paciente: false,
            encargado: false,
        });
    }


  return (
    <div>
        <div
        className="flex flex-col justify-center items-center gap-2">
            { /* DOCTOR FORM */ }
            <button type="button" onClick={handleClick} name="doctor"
            title="Agregar Doctor"
            className="w-9 bg-[hsl(0,0%,75%)] p-1 cursor-pointer
            rounded-[8px]
            hover:shadow-[0_0_3px_hsl(0,0%,50%)] hover:bg-[hsl(0,0%,70%)]
            transition-all duration-200">
                <img src="/src/assets/vaadin--doctor_white.png" alt="Doctor"
                 />
            </button>

            { /* PACIENTE FORM */ }
            <button type="button" onClick={handleClick} name="paciente"
            title="Agregar Paciente"
            className="w-9 bg-[hsl(0,0%,75%)] p-1 cursor-pointer
            rounded-[8px]
            hover:shadow-[0_0_3px_hsl(0,0%,50%)] hover:bg-[hsl(0,0%,70%)]
            transition-all duration-200">
                <img src="src/assets/mdi--patient_white.png" alt="Paciente"
                 />
            </button>

            { /* ENCARGADO FORM */ }
            <button type="button" onClick={handleClick} name="encargado"
            title="Agregar Encargado"
            className="w-9 bg-[hsl(0,0%,75%)] p-1 cursor-pointer
            rounded-[8px]
            hover:shadow-[0_0_3px_hsl(0,0%,50%)] hover:bg-[hsl(0,0%,70%)]
            transition-all duration-200">
                <img src="src/assets/user_white.png" alt="Encargado" />
            </button>
        </div>

        {
            form.doctor && (<DoctorFormModal onClose={formClose}/>) ||
            form.paciente && (<PacienteFormModal onClose={formClose} />) ||
            form.encargado && (<EncargadoFormModal onClose={formClose}/>) ||
            null
        }
    </div>
  )
}
