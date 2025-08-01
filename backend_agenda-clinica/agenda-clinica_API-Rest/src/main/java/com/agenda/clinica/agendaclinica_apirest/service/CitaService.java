package com.agenda.clinica.agendaclinica_apirest.service;

import com.agenda.clinica.agendaclinica_apirest.models.Cita;
import com.agenda.clinica.agendaclinica_apirest.repository.CitaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class CitaService {

    private final CitaRepository repository;
    public CitaService(CitaRepository repository) { this.repository = repository; }

    public List<Cita> getAll() { return repository.findAll(); }

    public Optional<Cita> getById(Integer id) { return repository.findById(id); }

    public List<Cita> getByDoctorId(Integer id) { return repository.getByDoctor(id); }

    public Cita save(Cita cita) { return repository.save(cita); }

    public Cita update(Integer id, Cita cita) {
        Cita citaExistente = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Cita no encontrada con el ID: "+id));

        citaExistente.setFechaInicio(cita.getFechaInicio());
        citaExistente.setFechaFin(cita.getFechaFin());
        citaExistente.setMotivo((cita.getMotivo()));
        citaExistente.setEstado(cita.getEstado());
        citaExistente.setDoctor((cita.getDoctor()));
        citaExistente.setEncargado(cita.getEncargado());

        return repository.save(citaExistente);
    }

    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,"Cita no econtrada con el ID: "+id);
        }
        repository.deleteById(id);
    }

    @Transactional
    public Cita patchCita(Integer id, Cita cita) {
        Cita citaExistente = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Cita no encontrada con el ID: "+id));
        if (cita.getFechaInicio() != null) {
            citaExistente.setFechaInicio(cita.getFechaInicio());
        }
        if (cita.getFechaFin() != null) {
            citaExistente.setFechaFin(cita.getFechaFin());
        }
        if (cita.getMotivo() != null) {
            citaExistente.setMotivo(cita.getMotivo());
        }
        if (cita.getEstado() != null) {
            citaExistente.setEstado(cita.getEstado());
        }
        if (cita.getDoctor() != null) {
            citaExistente.setDoctor(cita.getDoctor());
        }
        if (cita.getEncargado() != null) {
            citaExistente.setEncargado(cita.getEncargado());
        }

        return repository.save(citaExistente);
    }
}
