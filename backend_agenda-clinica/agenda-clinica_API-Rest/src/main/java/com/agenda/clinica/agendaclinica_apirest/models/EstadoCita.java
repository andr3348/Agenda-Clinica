package com.agenda.clinica.agendaclinica_apirest.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class EstadoCita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idEstado;

    private String nombreEstado;
    private String colorHex;

    public EstadoCita(int idEstado, String nombreEstado, String colorHex) {
        this.idEstado = idEstado;
        this.nombreEstado = nombreEstado;
        this.colorHex = colorHex;
    }
    public EstadoCita() {}

    public int getIdEstado() { return idEstado; }

    public void setIdEstado(int idEstado) { this.idEstado = idEstado; }

    public String getNombreEstado() { return nombreEstado; }

    public void setNombreEstado(String nombreEstado) { this.nombreEstado = nombreEstado; }

    public String getColorHex() { return colorHex; }

    public void setColorHex(String colorHex) { this.colorHex = colorHex; }
}
