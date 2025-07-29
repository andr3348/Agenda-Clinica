package com.agenda.clinica.agendaclinica_apirest.repository;

import com.agenda.clinica.agendaclinica_apirest.models.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Integer> {
    @Query(value =
            "SELECT id_cita, fecha_inicio, fecha_fin, motivo, id_paciente, id_doctor, id_estado, id_encargado, creado_en FROM cita WHERE id_doctor = :id"
            , nativeQuery = true)
    public List<Cita> getByDoctor(@Param("id") Integer id);
}