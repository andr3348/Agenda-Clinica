package com.agenda.clinica.agendaclinica_apirest.repository;

import com.agenda.clinica.agendaclinica_apirest.models.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
}
