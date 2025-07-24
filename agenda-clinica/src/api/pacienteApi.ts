import { API_URL } from "./citaApi";

export interface Paciente {
    idPaciente: number,
    nombre: string,
    telefono: string,
    email: string
}

export const getPacientes = async (): Promise<Paciente[]> => {
    const response = await fetch(`${API_URL}/pacientes`);
    if (!response.ok) throw new Error('Error al obtener los pacientes');
    return await response.json();
}

export const savePaciente = async (paciente: Partial<Paciente>): Promise<Paciente> => {
    const response = await fetch(`${API_URL}/pacientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paciente)
    });
    if (!response.ok) throw new Error("Error al guardar el paciente");
    return await response.json();
}

export const updatePaciente = async (id: string, paciente: Partial<Paciente>): Promise<Paciente> => {
    const response = await fetch(`${API_URL}/pacientes/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paciente)
    });
    if (!response.ok) throw new Error("Error al actualizar el paciente");
    return await response.json();
}