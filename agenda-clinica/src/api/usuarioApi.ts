import { API_URL } from "./citaApi"

export interface Usuario {
    idUsuario: number,
    nombre: string,
    email: string,
    rol: string
}

export const getUsuarios = async (): Promise<Usuario[]> => {
    const response = await fetch(`${API_URL}/usuarios`);
    if (!response.ok) throw new Error('No se pudo cargar los usuarios');
    return await response.json();
}

export const getByRol = async (rol: string) => {
    const firstLetter = rol.charAt(0);
    const remainingText = rol.slice(1);
    
    const response = await fetch(`${API_URL}/usuarios/rol/${firstLetter.toUpperCase() + remainingText.toLowerCase()}`);
    if (!response.ok) throw new Error(
        `No se pudo cargar los usuarios con el rol: ${firstLetter.toUpperCase() + remainingText.toLowerCase()}`);
    return await response.json();
}

export const saveUsuario = async (usuario: Partial<Usuario>): Promise<Usuario> => {
    const response = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    });
    return await response.json();
}

export const updateUsuario = async (id: string, usuario: Partial<Usuario>): Promise<Usuario> => {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    });
    return await response.json();
}