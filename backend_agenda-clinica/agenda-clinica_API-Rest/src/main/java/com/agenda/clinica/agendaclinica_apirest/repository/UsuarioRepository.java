package com.agenda.clinica.agendaclinica_apirest.repository;

import com.agenda.clinica.agendaclinica_apirest.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    @Query(value =
            "SELECT id_usuario, nombre, email, rol FROM usuario WHERE rol = :rol", nativeQuery = true)
    public List<Usuario> getByRol(@Param("rol") String rol);
}
