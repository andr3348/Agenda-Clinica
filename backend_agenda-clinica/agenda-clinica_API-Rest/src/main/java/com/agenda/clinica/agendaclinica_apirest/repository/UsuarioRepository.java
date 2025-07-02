package com.agenda.clinica.agendaclinica_apirest.repository;

import com.agenda.clinica.agendaclinica_apirest.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
}
