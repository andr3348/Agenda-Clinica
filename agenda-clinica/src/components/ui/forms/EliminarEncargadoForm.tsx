import React, { useEffect, useState } from 'react'
import { deleteUsuario, getUsuarios, type Usuario } from '../../../api/usuarioApi'

type Props = {
    onClose: () => void
}
export const EliminarEncargadoForm = ({ onClose }: Props) => {

    const fetchData = async () => {
        try {
            const allEncargados: Usuario[] = await getUsuarios();
            setEncargados(allEncargados);
            console.log('encargados: cargados:', allEncargados);
        } catch (error) {
            console.error("Error al obtener los encargados:", error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    const [encargados, setEncargados] = useState<Usuario[]>();

    const [formData, setFormData] = useState({
        encargado: '',
    });
    const changeFormData = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.encargado) {
            // Opcional: Mostrar un mensaje de error al usuario
            console.error("Por favor, seleccione un encargado para eliminar.");
            return;
        }
        await deleteUsuario(formData.encargado);
        onClose();
    }
    return (
        <div className='bg-[hsla(0,0%,0%,0.6)] h-screen w-screen absolute 
        top-0 left-0 flex justify-center items-center z-[1000]'>
            <div className='flex flex-col gap-4 bg-[hsl(0,0%,100%)] p-4 px-6
            rounded-[8px] w-sm'>
                <div className='flex flex-row w-full justify-between items-center'>
                    <h3 className='font-semibold'>Eliminar un Encargado(a)</h3>
                    <button type='button' onClick={onClose}
                        className='font-bold text-2xl text-[hsl(0,0%,60%)]
                    hover:text-[hsl(0,0%,50%)] cursor-pointer'>
                        &times;
                    </button>
                </div>
                <hr className='border-[hsl(0,0%,90%)]' />
                <form action="" onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="encargado" className='font-semibold text-[.8rem] text-[hsl(0,0%,40%))]'>Encargado(a):</label>
                        <select name="encargado" id="encargado" onChange={changeFormData}
                            className='border-[1px] 
              border-[hsl(0,0%,80%)] rounded-[8px] bg-[hsl(0,0%,98%)]
              p-2 text-[.9rem]'>
                            <option value="">Seleccione una opción</option>
                            {
                                encargados && encargados.map(encargado => (
                                    <option value={encargado.idUsuario} key={encargado.idUsuario}>{encargado.nombre}</option>
                                ))
                            }
                        </select>
                    </div>
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
                            className='bg-[hsl(0,50%,55%)] p-3 border-[1px] 
                        border-[hsl(0,50%,70%)] rounded-[8px] cursor-pointer
                        hover:bg-[hsl(0,50%,50%)] text-[#fff]
                        font-semibold text-[.9rem] transition-all duration-200]' >
                            Eliminar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
