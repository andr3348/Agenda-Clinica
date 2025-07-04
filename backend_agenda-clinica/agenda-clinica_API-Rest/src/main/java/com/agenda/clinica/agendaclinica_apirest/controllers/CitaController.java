package com.agenda.clinica.agendaclinica_apirest.controllers;

import com.agenda.clinica.agendaclinica_apirest.models.Cita;
import com.agenda.clinica.agendaclinica_apirest.service.CitaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/citas")
@CrossOrigin(origins = "http://localhost:5173")
public class CitaController {

    private final CitaService service;
    public CitaController(CitaService service) { this.service = service; }

    // GET /api/citas
    @GetMapping
    public ResponseEntity<List<Cita>> getAll() {
        List<Cita> citas = service.getAll();
        return ResponseEntity.ok(citas);
    }

    // GET /api/citas/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Cita> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/citas
    @PostMapping
    public ResponseEntity<Cita> create(@RequestBody Cita cita) {
        Cita nuevaCita = service.save(cita);
        return ResponseEntity.ok(nuevaCita);
    }

    // PUT /api/citas/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Cita> update(@PathVariable Integer id, @RequestBody Cita cita) {
        Cita citaActualizada = service.update(id, cita);
        return ResponseEntity.ok(citaActualizada);
    }

    // DELETE /api/citas/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
