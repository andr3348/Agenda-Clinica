package com.agenda.clinica.agendaclinica_apirest.repository;

import com.agenda.clinica.agendaclinica_apirest.models.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Integer> {
}
