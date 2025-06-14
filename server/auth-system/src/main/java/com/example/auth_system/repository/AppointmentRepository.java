package com.example.auth_system.repository;

import com.example.auth_system.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    @Query("""
    SELECT a FROM Appointment a
    WHERE a.consultant.consultantId = :consultantId
      AND a.appointmentDate = :date
      AND (
        CAST(a.startTime AS time) < CAST(:endTime AS time) AND CAST(a.endTime AS time) > CAST(:startTime AS time)
      )
""")
    List<Appointment> findConflictingAppointments(
            @Param("consultantId") int consultantId,
            @Param("date") LocalDate date,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime
    );

    List<Appointment> findByUser_UserId(int userID);

    List<Appointment> findByConsultant_ConsultantIdAndAppointmentDate(int consultantID, LocalDate date);
}