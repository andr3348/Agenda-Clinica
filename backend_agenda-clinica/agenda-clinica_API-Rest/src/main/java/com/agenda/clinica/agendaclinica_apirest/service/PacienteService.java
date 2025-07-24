package com.agenda.clinica.agendaclinica_apirest.service;

import com.agenda.clinica.agendaclinica_apirest.models.Paciente;
import com.agenda.clinica.agendaclinica_apirest.repository.PacienteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {

    private final PacienteRepository repository;
    public PacienteService(PacienteRepository repository) { this.repository = repository; }

    public List<Paciente> getAll() { return repository.findAll(); }

    public Optional<Paciente> getById(Integer id) { return repository.findById(id); }

    public Paciente save(Paciente paciente) { return repository.save(paciente); }

    public Paciente update(Integer id, Paciente paciente) {
        Paciente pacienteExistente = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,"Paciente no encontrado con el ID: "+id));

        pacienteExistente.setNombre(paciente.getNombre());
        pacienteExistente.setEmail(paciente.getEmail());
        pacienteExistente.setTelefono(paciente.getTelefono());

        return repository.save(pacienteExistente);
    }

    public Paciente patch(Integer id, Paciente paciente) {
        Paciente pacienteExistente = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,"Paciente no encontrado con el ID: "+id));
        if (paciente.getNombre() != null) {
            pacienteExistente.setNombre(paciente.getNombre());
        }
        if (paciente.getEmail() != null) {
            pacienteExistente.setEmail(paciente.getEmail());
        }
        if (paciente.getTelefono() != null) {
            pacienteExistente.setTelefono(paciente.getTelefono());
        }

        return  repository.save(pacienteExistente);
    }

    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,"Paciente no encontrado con el ID: "+id);
        }
        repository.deleteById(id);
    }
}
