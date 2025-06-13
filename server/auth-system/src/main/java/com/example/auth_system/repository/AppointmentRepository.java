package com.example.auth_system.repository;

import com.example.auth_system.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    @Query("SELECT a FROM Appointment a WHERE " +
            "a.consultant.consultantID = :consultantID AND " +
            "a.appointmentDate = :appointmentDate AND " +
            "((:startTime < a.endTime AND :endTime > a.startTime))")
    List<Appointment> findConflictingAppointments(
            @Param("consultantID") int consultantID,
            @Param("appointmentDate") LocalDate appointmentDate,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime
    );

    List<Appointment> findByUser_UserId(int userId);

    List<Appointment> findByConsultant_ConsultantIDAndAppointmentDate(int consultantID, LocalDate appointmentDate);
}