package com.agenda.clinica.agendaclinica_apirest.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idUsuario;

    private String nombre;
    private String email;
    private String rol;

    public Usuario(int idUsuario, String nombre, String email, String rol) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.email = email;
        this.rol = rol;
    }
    public Usuario() {}

    public int getIdUsuario() { return idUsuario; }

    public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }

    public String getNombre() { return nombre; }

    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getRol() { return rol; }

    public void setRol(String rol) { this.rol = rol; }
}
