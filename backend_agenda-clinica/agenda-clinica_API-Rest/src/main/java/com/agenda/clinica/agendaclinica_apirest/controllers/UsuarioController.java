package com.agenda.clinica.agendaclinica_apirest.controllers;

import com.agenda.clinica.agendaclinica_apirest.models.Usuario;
import com.agenda.clinica.agendaclinica_apirest.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    private final UsuarioService service;
    public UsuarioController(UsuarioService service) { this.service = service; }

    // GET /api/usuarios
    @GetMapping
    public ResponseEntity<List<Usuario>> getAll() {
        List<Usuario> usuarios = service.getAll();
        return ResponseEntity.ok(usuarios);
    }

    // GET /api/usuarios/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/usuarios
    @PostMapping
    public ResponseEntity<Usuario> create(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = service.save(usuario);
        return ResponseEntity.ok(nuevoUsuario);
    }

    // PUT /api/usuarios/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> update(@PathVariable Integer id, @RequestBody Usuario usuario) {
        Usuario usuarioActualizado = service.update(id, usuario);
        return ResponseEntity.ok(usuarioActualizado);
    }

    // DELETE /api/usuarios/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    // CUSTOM QUERIES ---

    // GET /api/usuarios/rol/{rol}
    @GetMapping("/rol/{rol}")
    public ResponseEntity<List<Usuario>> getByRol(@PathVariable String rol) {
        List<Usuario> usuarios = service.getByRol(rol);
        return ResponseEntity.ok(usuarios);
    }
}
