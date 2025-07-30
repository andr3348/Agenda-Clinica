import { API_URL } from "./citaApi";

export interface Doctor {
    idDoctor: number,
    nombre: string,
    especialidad?: string
}

export const getDoctores = async (): Promise<Doctor[]> => {
    const response = await fetch(`${API_URL}/doctores`);
    if (!response.ok) throw new Error('Error al obtener los doctores');
    return await response.json();
}

export const saveDoctor = async (doctor: Partial<Doctor>): Promise<Doctor> => {
    const response = await fetch(`${API_URL}/doctores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctor)
    });
    if (!response.ok) throw new Error('Error al crear el doctor');
    return await response.json();
}

export const updateDoctor = async (idDoctor: string, doctor: Partial<Doctor>): Promise<Doctor> => {
    const response = await fetch(`${API_URL}/doctores/${idDoctor}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctor)
    });
    if (!response.ok) throw new Error('Error al actualizar el doctor');
    return await response.json();
}

export const deleteDoctor = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/doctores/${id}`, {
        method: "DELETE"
    });
    if (!response.ok) throw new Error(`No se pudo eliminar el doctor con el id: ${id}`);
}