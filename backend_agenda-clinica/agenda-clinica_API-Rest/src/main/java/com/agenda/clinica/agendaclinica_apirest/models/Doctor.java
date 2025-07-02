package com.agenda.clinica.agendaclinica_apirest.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idDoctor;

    private String nombre;
    private String especialidad;

    public Doctor(int idDoctor, String nombre, String especialidad) {
        this.idDoctor = idDoctor;
        this.nombre = nombre;
        this.especialidad = especialidad;
    }

    public Doctor() {}

    public int getIdDoctor() { return idDoctor; }

    public void setIdDoctor(int idDoctor) { this.idDoctor = idDoctor; }

    public String getNombre() { return nombre; }

    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEspecialidad() { return especialidad; }

    public void setEspecialidad(String especialidad) { this.especialidad = especialidad; }
}
