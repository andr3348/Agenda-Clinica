const API_URL: string = import.meta.env.VITE_API_URL;

export interface Cita {
    idCita: number;
    fechaInicio: string;
    fechaFin: string;
    motivo: string;
    paciente: {
        nombre: string;
        telefono: string;
        email: string;
    };
    doctor: {
        nombre: string;
    };
    estado: {
        nombreEstado: string;
        colorHex: string;
    };
    encargado?: {
        nombre: string;
    };
    creadoEn: string;
}

export const getCitas = async (): Promise<Cita[]> => {
    const response = await fetch(`${API_URL}/citas`);
    if (!response.ok) throw new Error("Error al obtener las citas");
    return await response.json();
};

export const saveCita = async (cita: Partial<Cita>): Promise<Cita> => {
    const response = await fetch(`${API_URL}/citas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cita),
    });
    if (!response.ok) throw new Error("Error al crear cita");
    return await response.json();
};

export const updateCita = async (idCita: string, cita: Partial<Cita>): Promise<Cita> => {
    const response = await fetch(`${API_URL}/citas/${idCita}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cita),
    });
    if (!response.ok) throw new Error("Error al modificar la cita");
    return await response.json();
}