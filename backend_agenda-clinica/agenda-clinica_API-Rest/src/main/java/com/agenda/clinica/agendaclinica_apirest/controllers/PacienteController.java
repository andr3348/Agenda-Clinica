package com.agenda.clinica.agendaclinica_apirest.controllers;

import com.agenda.clinica.agendaclinica_apirest.models.Paciente;
import com.agenda.clinica.agendaclinica_apirest.service.PacienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    private final PacienteService service;
    public PacienteController(PacienteService service) { this.service = service; }

    // GET /api/pacientes
    @GetMapping
    public ResponseEntity<List<Paciente>> getAll() {
        List<Paciente> pacientes = service.getAll();
        return ResponseEntity.ok(pacientes);
    }

    // GET /api/pacientes/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Paciente> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/pacientes
    @PostMapping
    public ResponseEntity<Paciente> create(@RequestBody Paciente paciente) {
        Paciente nuevoPaciente = service.save(paciente);
        return ResponseEntity.ok(nuevoPaciente);
    }

    // PUT /api/pacientes/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Paciente> update(@PathVariable Integer id, @RequestBody Paciente paciente) {
        Paciente pacienteActualizado = service.update(id, paciente);
        return ResponseEntity.ok(pacienteActualizado);
    }

    // DELETE /api/citas/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
