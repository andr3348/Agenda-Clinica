import React, { useState } from 'react'
import { saveUsuario } from '../../../api/usuarioApi';

type Props = {
    onClose: () => void
}

export const EncargadoFormModal = ({ onClose }: Props) => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        rol: 'recepcionista',
    });

    const changeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const [successMessage, setSuccessMessage] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            nombre: formData.nombre,
            email: formData.email,
            rol: formData.rol,
        }

        try {
            if (!payload.nombre || !payload.email || !payload.rol) {
                console.error("Por favor, asegúrate de que todos los campos estén completados.");
                return;
            }

            await saveUsuario(payload);
            setSuccessMessage(true);
        } catch (error) {
            console.error("Falló la creación del usuario:", error);
        }
    }
    return (
        <div className='bg-[hsla(0,0%,0%,0.6)] h-screen w-screen
        absolute top-0 left-0 flex justify-center items-center z-[1000]'>
            <div className='flex flex-col gap-4 bg-[hsl(0,0%,100%)] p-4 px-6
            rounded-[8px] w-sm'>
                <div className='flex flex-row w-full justify-between items-center'>
                    <h3 className='font-semibold'>Nuevo(a) Encargado(a)</h3>
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

                    <div className='flex flex-col'>
                        <label htmlFor="email"
                        className='font-semibold text-[.8rem] text-[hsl(0,0%,40%))]' >
                            Email:
                        </label>
                        <input type="email" name="email" id="email" required
                            value={formData.email} onChange={changeFormData}
                            className='bg-[hsl(0,0%,98%)] p-3 border-[1px] 
                        border-[hsl(0,0%,80%)] rounded-[8px]' />
                    </div>

                    {
                        successMessage && (
                            <div className='bg-[hsl(130,60%,70%)] p-2 w-fit rounded-[8px]
                            border-[1px] border-[hsl(130,60%,40%)] self-center'>
                                <p className='font-semibold text-[.9rem] text-[hsl(0,0%,20%))]'>
                                    Encargado(a) creado con éxito.
                                </p>
                            </div>
                        )
                    }

                    <hr className='border-[hsl(0,0%,90%)]' />
                    <div className='flex flex-col gap-3'>
                        <button type='button' onClick={onClose}
                        className='bg-[hsl(0,0%,90%)] p-3 border-[1px] 
                        border-[hsl(0,0%,80%)] rounded-[8px] cursor-pointer
                        hover:bg-[hsl(0,0%,87%)] text-[hsl(0,0%,25%))]
                        font-semibold text-[.9rem] transition-all duration-200' >
                            Cancelar
                        </button>
                        <button type='submit'
                        className='bg-[hsl(220,70%,52%)] p-3 border-[1px]
                        border-[hsl(0,0%,80%)] rounded-[8px] cursor-pointer
                        hover:bg-[hsl(220,70%,47%)] text-[#fff]
                        font-semibold text-[.9rem] transition-all duration-200' >
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
