package com.agenda.clinica.agendaclinica_apirest.service;

import com.agenda.clinica.agendaclinica_apirest.models.Doctor;
import com.agenda.clinica.agendaclinica_apirest.repository.DoctorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    private final DoctorRepository repository;
    public DoctorService(DoctorRepository repository) { this.repository = repository; }

    public List<Doctor> getAll() { return repository.findAll(); }

    public Optional<Doctor> getById(Integer id) { return repository.findById(id); }

    public Doctor save(Doctor doctor) { return repository.save(doctor); }

    public Doctor update(Integer id, Doctor doctor) {
        Doctor doctorExistente = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,"Doctor no encontrado con el ID: "+id));

        doctorExistente.setNombre(doctor.getNombre());
        doctorExistente.setEspecialidad(doctor.getEspecialidad());

        return repository.save(doctorExistente);
    }

    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,"Doctor no econtrado con el ID: "+id);
        }
        repository.deleteById(id);
    }
}
