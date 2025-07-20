package com.agenda.clinica.agendaclinica_apirest.service;

import com.agenda.clinica.agendaclinica_apirest.models.EstadoCita;
import com.agenda.clinica.agendaclinica_apirest.repository.EstadoCitaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class EstadoCitaService {

    private final EstadoCitaRepository repository;
    public EstadoCitaService(EstadoCitaRepository repository) { this.repository = repository; }

    public List<EstadoCita> getAll() { return repository.findAll(); }

    public Optional<EstadoCita> getById(Integer id) { return repository.findById(id); }

    public EstadoCita save(EstadoCita estadoCita) { return repository.save(estadoCita); }

    public EstadoCita update(Integer id, EstadoCita estadoCita) {
        EstadoCita estadoCitaExistente = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,"Estado de cita no encontrado con el ID: "+id));

        estadoCitaExistente.setNombreEstado(estadoCita.getNombreEstado());
        estadoCitaExistente.setColorHex(estadoCita.getColorHex());

        return repository.save(estadoCitaExistente);
    }

    public EstadoCita patch(Integer id, EstadoCita estadoCita) {
        EstadoCita estadoCitaExistente = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,"Estado de cita no encontrado con el ID: "+id));

        if (estadoCitaExistente.getNombreEstado() != null) {
            estadoCitaExistente.setNombreEstado(estadoCita.getNombreEstado());
        }
        if (estadoCitaExistente.getColorHex() != null) {
            estadoCitaExistente.setColorHex(estadoCita.getColorHex());
        }

        return repository.save(estadoCitaExistente);
    }

    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,"Estado de cita no encontrada con el ID: "+id);
        }
        repository.deleteById(id);
    }
}
