package com.agenda.clinica.agendaclinica_apirest.controllers;

import com.agenda.clinica.agendaclinica_apirest.models.Doctor;
import com.agenda.clinica.agendaclinica_apirest.service.DoctorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctores")
public class DoctorController {

    private final DoctorService service;
    public DoctorController(DoctorService service) { this.service = service; }

    // GET /api/doctores
    @GetMapping
    public ResponseEntity<List<Doctor>> getAll() {
        List<Doctor> doctores = service.getAll();
        return ResponseEntity.ok(doctores);
    }

    // GET /api/doctores/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/doctores
    @PostMapping
    public ResponseEntity<Doctor> create(@RequestBody Doctor doctor) {
        Doctor nuevoDoctor = service.save(doctor);
        return ResponseEntity.ok(nuevoDoctor);
    }

    // PUT /api/doctores/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Doctor> update(@PathVariable Integer id, @RequestBody Doctor doctor) {
        Doctor doctorActualizado = service.update(id, doctor);
        return ResponseEntity.ok(doctorActualizado);
    }

    // DELETE /api/doctores/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
