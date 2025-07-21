package com.agenda.clinica.agendaclinica_apirest.controllers;

import com.agenda.clinica.agendaclinica_apirest.models.EstadoCita;
import com.agenda.clinica.agendaclinica_apirest.service.EstadoCitaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estadosCita")
@CrossOrigin(origins = "http://localhost:5173")
public class EstadoCitaController {

    private final EstadoCitaService service;
    public EstadoCitaController(EstadoCitaService service) { this.service = service; }

    // GET /api/estadosCita
    @GetMapping
    public ResponseEntity<List<EstadoCita>> getAll() {
        List<EstadoCita> estados = service.getAll();
        return ResponseEntity.ok(estados);
    }

    // GET /api/estadosCita/{id}
    @GetMapping("/{id}")
    public ResponseEntity<EstadoCita> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/estadosCita
    @PostMapping
    public ResponseEntity<EstadoCita> create(@RequestBody EstadoCita estado) {
        EstadoCita nuevoEstado = service.save(estado);
        return ResponseEntity.ok(nuevoEstado);
    }

    // PUT /api/estadosCita/{id}
    @PutMapping("/{id}")
    public ResponseEntity<EstadoCita> update(@PathVariable Integer id, @RequestBody EstadoCita estado) {
        EstadoCita estadoActualizado = service.update(id, estado);
        return ResponseEntity.ok(estadoActualizado);
    }

    // PATCH api/estadosCita/{id}
    @PatchMapping("/{id}")
    public ResponseEntity<EstadoCita> patch(@PathVariable Integer id, @RequestBody EstadoCita estadoCita) {
        EstadoCita estadoActualizado = service.patch(id, estadoCita);
        return ResponseEntity.ok(estadoActualizado);
    }

    // DELETE /api/estadosCita/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
