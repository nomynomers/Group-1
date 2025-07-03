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

    @Query(value = """
    SELECT * FROM Appointments 
    WHERE consultantID = :consultantId
    AND appointmentDate = :date
    AND CAST(startTime AS TIME) = CAST(:startTime AS TIME)
""", nativeQuery = true)
    List<Appointment> findConflictingAppointments(
            @Param("consultantId") int consultantId,
            @Param("date") LocalDate date,
            @Param("startTime") LocalTime startTime
    );

    List<Appointment> findByUser_UserId(int userID);
    List<Appointment> findByConsultant_ConsultantID(int consultantId);
}
