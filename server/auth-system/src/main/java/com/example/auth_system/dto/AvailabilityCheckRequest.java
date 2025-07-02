package com.example.auth_system.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AvailabilityCheckRequest {
    private int consultantId;
    private LocalDate date;
    private LocalTime time;
}
