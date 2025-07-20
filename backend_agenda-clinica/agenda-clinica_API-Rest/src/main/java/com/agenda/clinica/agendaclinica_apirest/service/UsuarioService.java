package com.agenda.clinica.agendaclinica_apirest.service;

import com.agenda.clinica.agendaclinica_apirest.models.Usuario;
import com.agenda.clinica.agendaclinica_apirest.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;
    public UsuarioService(UsuarioRepository repository) { this.repository = repository; }

    public List<Usuario> getAll() { return repository.findAll(); }

    public Optional<Usuario> getById(Integer id) { return repository.findById(id); }

    public Usuario save(Usuario usuario) { return repository.save(usuario); }

    public Usuario update(Integer id, Usuario usuario) {
        Usuario usuarioExistente = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,"Usuario no encontrado con el ID: "+id));

        usuarioExistente.setNombre(usuario.getNombre());
        usuarioExistente.setEmail(usuario.getEmail());
        usuarioExistente.setRol(usuario.getRol());

        return repository.save(usuarioExistente);
    }

    public Usuario patch(Integer id, Usuario usuario) {
        Usuario usuarioExistente = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,"Usuario no encontrado con el ID: "+id));
        if (usuarioExistente.getNombre() != null) {
            usuarioExistente.setNombre(usuario.getNombre());
        }
        if (usuarioExistente.getEmail() != null) {
            usuarioExistente.setEmail(usuario.getEmail());
        }
        if (usuarioExistente.getRol() != null) {
            usuarioExistente.setRol(usuario.getRol());
        }

        return repository.save(usuarioExistente);
    }

    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,"Usuario no encontrado con el ID: "+id);
        }
        repository.deleteById(id);
    }

    // CUSTOM QUERIES ---

    public List<Usuario> getByRol(String rol) { return repository.getByRol(rol); }
}
