package com.agenda.clinica.agendaclinica_apirest.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Cita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCita;

    private LocalDateTime fechaInicio;
    private LocalDateTime fechaFin;
    private String motivo;

    @ManyToOne
    @JoinColumn(name = "id_paciente", nullable = false)
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "id_doctor", nullable = true)
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "id_estado", nullable = false)
    private EstadoCita estado;

    @ManyToOne
    @JoinColumn(name = "id_encargado", nullable = true)
    private Usuario encargado;

    private LocalDateTime creadoEn = LocalDateTime.now();

    public Cita(int idCita, LocalDateTime fechaInicio, LocalDateTime fechaFin,
                String motivo, Paciente paciente, Doctor doctor,
                EstadoCita estado, Usuario encargado, LocalDateTime creadoEn) {
        this.idCita = idCita;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.motivo = motivo;
        this.paciente = paciente;
        this.doctor = doctor;
        this.estado = estado;
        this.encargado = encargado;
        this.creadoEn = creadoEn;
    }
    public Cita() {}

    public int getIdCita() { return idCita; }

    public void setIdCita(int idCita) { this.idCita = idCita; }

    public LocalDateTime getFechaInicio() { return fechaInicio; }

    public void setFechaInicio(LocalDateTime fechaInicio) { this.fechaInicio = fechaInicio; }

    public LocalDateTime getFechaFin() { return fechaFin; }

    public void setFechaFin(LocalDateTime fechaFin) { this.fechaFin = fechaFin; }

    public String getMotivo() { return motivo; }

    public void setMotivo(String motivo) { this.motivo = motivo; }

    public Paciente getPaciente() { return paciente; }

    public void setPaciente(Paciente paciente) { this.paciente = paciente; }

    public Doctor getDoctor() { return doctor; }

    public void setDoctor(Doctor doctor) { this.doctor = doctor; }

    public EstadoCita getEstado() { return estado; }

    public void setEstado(EstadoCita estado) { this.estado = estado; }

    public Usuario getEncargado() { return encargado; }

    public void setEncargado(Usuario encargado) { this.encargado = encargado; }

    public LocalDateTime getCreadoEn() { return creadoEn; }

    public void setCreadoEn(LocalDateTime creadoEn) { this.creadoEn = creadoEn; }
}
