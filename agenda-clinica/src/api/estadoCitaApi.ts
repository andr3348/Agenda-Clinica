import { API_URL } from "./citaApi"

export interface EstadoCita {
    idEstado: number,
    nombreEstado: string,
    colorHex: string
}

export const getEstadosCita = async (): Promise<EstadoCita[]> => {
    const response = await fetch(`${API_URL}/estadosCita`);
    if (!response.ok) throw new Error('Error al obtener los estados de citas');
    return await response.json();
}

export const saveEstadoCita = async (estadoCita: Partial<EstadoCita>) => {
    const response = await fetch(`${API_URL}/estadosCita`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(estadoCita)
    });
    if (!response.ok) throw new Error('Error al crear el estadoCita');
    return await response.json();
}

export const updateEstadoCita = async (id: string, estadoCita: EstadoCita) => {
    const response = await fetch(`${API_URL}/estadosCita/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(estadoCita)
    });
    if (!response.ok) throw new Error('Error al actualizar el estado de cita');
    return await response.json();
}